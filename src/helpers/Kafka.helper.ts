import { Kafka }  from "kafkajs";
import { loggers } from "winston";
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
  retry:{
    factor:2
  }
})

export const producer = kafka.producer()
export const consumer = kafka.consumer({ groupId: 'product' })

export const ConnectAndInstantiateProducerAndConsumer = async () => {
    // Producing
    try {
      await producer.connect()
    // publishToKafka("product-topic","Hello From TS node ");
    // Consuming
      // await consumer.connect()
      console.log("Producer Connected Success fully")
    } catch (error) {
      console.error("ERROR OCCURED WHILE CONNECTING TO KAFKA ------------------------------- ",error);
      
    }
    
   
  }
export const publishToKafka=async(topic:string,messages:any)=>{
      console.log("Sending to topic ",topic)
      await producer.send({
      topic: topic,
      messages: [
        { value: messages },
      ],
    })
}
export const subscribeToKafka=async()=>{
    await consumer.subscribe({ topic: 'user-topic', fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if(message!=null){
          console.log("MESSAGE GOT ",{
          partition,
          offset: message.offset,
          value: message.value?.toString(),
        })
        }
        
      },
    })
}