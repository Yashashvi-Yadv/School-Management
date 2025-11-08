import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "school-app",
  brokers: ["localhost:9092"],
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "school-group" });

export async function initkafka() {
  await producer.connect();
  await consumer.connect();
  console.log("kafka is connected");
}

initkafka();
