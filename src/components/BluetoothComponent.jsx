import React from 'react';

class BluetoothComponent extends React.Component {
  constructor(props) {
    super(props);
    this.bluetoothDevice = null;
  }

  connectToDevice = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['4c4c4544-0058-4e10-8056-b3c04f594d33'] }]
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('4c4c4544-0058-4e10-8056-b3c04f594d33');
      // Realiza acciones adicionales con el servicio Bluetooth

      this.bluetoothDevice = device;
      console.log('Conectado al dispositivo Bluetooth');
    } catch (error) {
      console.error('Error al conectar con el dispositivo Bluetooth', error);
    }
  };

  disconnect = () => {
    if (this.bluetoothDevice) {
      this.bluetoothDevice.gatt.disconnect();
      console.log('Desconectado del dispositivo Bluetooth');
      this.bluetoothDevice = null;
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.connectToDevice}>Conectar a dispositivo Bluetooth</button>
        <button onClick={this.disconnect}>Desconectar</button>
      </div>
    );
  }
}

export default BluetoothComponent
