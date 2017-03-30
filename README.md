Estamos en 2020, los mercados de monedas tradicionales se han desplomado y todo el interés del mercado se ha centrado en las criptomonedas.
Te llama Leonardo Farkas, Alcalde de Santiago, y te comenta que quiere instalar un gran letrero luminoso en la Plaza Baquedano con una visualización en tiempo real de los últimos movimientos en el mercado cambiario Bitcoin - Dolar.

Reglas:
- Tienes solo 1hr 30min para resolver este desafío.
- Sube el código a un repositorio Git.
- Cuando termines déjalo andando en tu máquina, usando localtunnel.me para que podamos verlo en acción y avísanos.
- Todo vale, puedes copiar código o usar librerías, pero es obligación citar la fuente.

Para acceder a los datos, cuentas con una API bajo Websockets en un mercado Bitcoin-Dólar llamado Bitfinex. Este código ejemplo te puede servir, pero ojo, que lo que te pedimos tiene que correr en un browser y no tienes que armar un backend:

```javascript
const ws = require('ws')
const w = new ws('wss://api.bitfinex.com/ws/v2')

w.on('message', (msg) => console.log(msg))

var msg = JSON.stringify({
  event: 'subscribe',
  channel: 'ticker',
  symbol: 'tBTCUSD'
})

w.on('open', () => w.send(msg))
```

y el resultado de eso es un stream de datos con esta forma:

```
[3,907.7,8.304992,907.78,12.48,-57.12,-0.0592,907.88,58281.37379606,1025,871]
[3,"hb"]
[3,"hb"]
[3,"hb"]
[3,"hb"]
[3,907.7,7.304992,907.78,12.4172,-57.3,-0.0594,907.7,58282.43659606,1025,871]
[3,"hb"]
[3,"hb"]
```

Cuando el arreglo viene con "hb" puedes ignorarlo. Cuando viene con datos, te interesan algunos:

```javascript
arr[0] // ignore
arr[1] = BID  // float Price of last highest bid
arr[2] = BID_SIZE // float Size of the last highest bid
arr[3] = ASK // float Price of last lowest ask
arr[4] = ASK_SIZE // float Size of the last lowest ask
arr[5] // ignore
...
```

Para entender qué son estas cosas, imagina un grupo de gente gritando sobre comprar o vender bitcoins:

BID es el precio mas alto al cual alguien está dispuesto a comprar y BID_SIZE es la cantidad que está dispuesto a comprar.
ASK es el precio mas bajo al cual alguien está dispuesto a vender y ASK_SIZE es la cantidad que está dispuesto a vender.

Al alcalde le interesa una visualización en tiempo real (utilizando cualquier framework de visualización, o ninguno) pero lo que más le interesa es que permita determinar fácilmente, en orden de más a menos importante:

- Qué tamaño va teniendo la diferencia entre el precio más alto al que quieren comprar y el más bajo al que quieren venden. (La diferencia entre BID y ASK.)
- Qué tamaño va teniendo la diferencia entre la cantidad que están dispuestos a comprar y la cantidad que están dispuestos a vender
- Cuál es el precio de cada BID y cada ASK

Algo muy importante para el Alcalde: mantener en la vista los últimos 5 arreglos recibidos.

Buscamos evaluar:
- habilidad para interpretar requerimientos, comprensión lectora
- calidad de código: se entiende el apuro pero se valora un código que se entienda
- uso de git: por favor haz commits al menos cada 15 minutos y usa mensajes de commit que se entiendan
- priorización de tareas: intenta llegar con algo funcionando, aunque no sea perfecto ni completo
