class orderModel {
    updateStatus(newStatus){
        return this.status === newStatus
    }

    updateDelivery(newDelivery){
        return this.delivery === newDelivery
    }

    addPackaging(packageType, amount = 1){
        this.packaging.push({packageType, amount})
        return this.save();
    }
}

module.exports = orderModel;