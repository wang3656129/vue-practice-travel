var app = new Vue({
    el: '#app',
    data: {
        text: '',
        data: [],
        currentPage: 0,
        location: [],
        currentZone: ''
    },
    created() {
        const vm = this;
        axios.get('https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97')
            .then(function (response) {
                console.log(response);
                vm.data = response.data.result.records
                console.log(vm.data);
                vm.getUniquelist()
            })
            .catch(function (error) {
                console.log(error);
            })
    },
    methods: {
        getUniquelist() {
            const vm = this;
            const locations = new Set();
            vm.data.forEach((item, i) => {
                locations.add(item.Zone)
            })
            vm.location = Array.from(locations);
        }
    },
    computed: {
        filterData() {
            const vm = this;
            let items = [];
            if(vm.currentZone!== ''){
                items = vm.data.filter((item, i) => {
                    return item.Zone === vm.currentZone
                })
            }
            else{
                items = vm.data
            }

            const newData = [];
            items.forEach((item, i) => {
                if (i % 10 === 0) {
                    newData.push([])
                }
                const page = parseInt(i / 10)
                newData[page].push(item)
            })
            return newData
        }
    }
})