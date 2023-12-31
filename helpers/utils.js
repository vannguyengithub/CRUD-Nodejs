const ItemsModel = require('./../schemas/items');
let createFilterStatus = (currentStatus) => {
    let statusFilter = [
        {name: 'All', value: 'all', count: 4, link: '#', class: 'default'},
        {name: 'Active', value: 'active', count: 2, link: '#', class: 'default'},
        {name: 'InActive', value: 'inactive', count: 4, link: '#', class: 'default'},
    ];


    statusFilter.map((item, index) => {
        let condition = {};
        if (item.value !== 'all') condition = {
            status: item.value
        }

        if (item.value === currentStatus) statusFilter[index].class = 'success';
        
        return ItemsModel.countDocuments(condition)
            .then((data) => {
                statusFilter[index].count = data;
            })
            .catch((error) => {
                console.error(error);
            });
    });

    return statusFilter
}

module.exports = {
    createFilterStatus: createFilterStatus
}