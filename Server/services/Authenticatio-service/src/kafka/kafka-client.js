import { Kafka } from "kafkajs";
import { listener } from "../controllers/teacher-services.js";

const kafka = new Kafka({
  clientId: "school-app",
  brokers: ["localhost:9092"],
});
export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "school-group" });

export async function initkafka() {
  try {
    await producer.connect();
    await consumer.connect();
    console.log("kafka is connected");
  } catch (error) {
    console.log("start the server of kafka");
  }
}
initkafka();
listener();
