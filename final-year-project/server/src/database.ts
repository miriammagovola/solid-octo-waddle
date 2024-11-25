import * as mongodb from "mongodb";
import { BloodPressure } from "./bloodpressure";

export const collections: {
  bloodpressure?: mongodb.Collection<BloodPressure>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db("final-year-project");
  
  // Ensure applySchemaValidation is defined, or comment this line out if it's not needed
  // await applySchemaValidation(db); 

  const bloodpressureCollection = db.collection<BloodPressure>("bloodpressure");
  collections.bloodpressure = bloodpressureCollection;

  console.log("Successfully connected to the database");
}

// Example applySchemaValidation function (if needed)
import { Db } from "mongodb";

async function applySchemaValidation(db: Db) {
  const schema = {
    bsonType: "object",
    required: ["Name", "Age", "Weight", "SystolicPressure", "DiastolicPressure", "PulseRate", "MeanArterialPressure", "DateStamp", "PreviousReadings", "AlertsReminders", "GraphsCharts"],
    properties: {
      Name: {
        bsonType: "string",
        description: "must be a string and is required"
      },
      Age: {
        bsonType: "int",
        description: "must be an integer and is required"
      },
      Weight: {
        bsonType: "int",
        description: "must be an integer and is required"
      },
      SystolicPressure: {
        bsonType: "int",
        description: "must be an integer and is required"
      },
      DiastolicPressure: {
        bsonType: "int",
        description: "must be an integer and is required"
      },
      PulseRate: {
        bsonType: "int",
        description: "must be an integer and is required"
      },
      MeanArterialPressure: {
        bsonType: "int",
        description: "must be an integer and is required"
      },
      DateStamp: {
        bsonType: "date",
        description: "must be a date and is required"
      },
      PreviousReadings: {
        bsonType: "array",
        items: {
          bsonType: "object",
          required: ["SystolicPressure", "DiastolicPressure", "PulseRate", "DateStamp"],
          properties: {
            SystolicPressure: {
              bsonType: "int",
              description: "must be an integer and is required"
            },
            DiastolicPressure: {
              bsonType: "int",
              description: "must be an integer and is required"
            },
            PulseRate: {
              bsonType: "int",
              description: "must be an integer and is required"
            },
            DateStamp: {
              bsonType: "date",
              description: "must be a date and is required"
            }
          }
        }
      },
      AlertsReminders: {
        bsonType: "array",
        items: {
          bsonType: "object",
          required: ["message", "date"],
          properties: {
            message: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            date: {
              bsonType: "date",
              description: "must be a date and is required"
            }
          }
        }
      },
      GraphsCharts: {
        bsonType: "object",
        description: "must be an object and is required"
      }
    }
  };

  await db.command({
    collMod: "bloodpressure",
    validator: { $jsonSchema: schema },
    validationLevel: "moderate"
  });

  console.log("Schema validation applied to bloodpressure collection");
}

