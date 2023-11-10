export function setWarehouseSelected(warehouseId: number): void {
    try {
        localStorage.setItem('warehouseId', warehouseId.toString());
    } catch (_) {
        console.error('Local storage is not supported.');
    }
}

export function getWarehouseSelected(): number | null {
    try {
        const warehouseId = localStorage.getItem('warehouseId');
        return warehouseId ? parseInt(warehouseId) : null;
    } catch (_) {
        console.error('Local storage is not supported.');
        return null;
    }
}
