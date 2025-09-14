import { consumer } from "../kafka/kafka-client.js";
import UserModel from "../models/auth.model.js";
import TeacherModel from "../models/teacher.model.js";

export async function listener() {
  await consumer.subscribe({
    topic: "teacher-event",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const event = JSON.parse(message.value.toString());

        switch (event.type) {
          case "TEACHER ADDED": {
            const user = await UserModel.findById(event.id);
            if (!user) {
              console.error(`User with id ${event.id} not found`);
              return;
            }
            user.teachers.push(event.payload._id);
            await user.save();

            break;
          }

          case "TEACHER DELETE": {
            await UserModel.updateMany(
              { teachers: event.payload },
              { $pull: { teachers: event.payload } }
            );
            break;
          }

          case "student added": {
            const teacher = await TeacherModel.findById(event.id);
            if (!teacher) {
              return;
            }
            teacher.students.push(event.payload);
            await teacher.save();
            break;
          }

          case "student deleted": {
            await TeacherModel.updateMany(
              { students: event.payload },
              { $pull: { students: event.paylaod } }
            );
            console.log("deleted student");

            break;
          }
          default:
            console.log("Unknown event type:", event.type);
        }
      } catch (err) {
        console.error("Error processing Kafka message:", err);
      }
    },
  });
}

export default { listener };
