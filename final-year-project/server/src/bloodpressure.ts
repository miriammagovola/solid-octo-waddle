import { ObjectId } from "mongodb";

export interface BloodPressure {
  Name: string; // Use lowercase 'string' for TypeScript type
  Age: number; // Use 'number' for numeric types
  id?: ObjectId; // Import 'ObjectId' correctly from 'mongodb'
  Weight: number;
  SystolicPressure: number;
  DiastolicPressure: number;
  PulseRate: number;
  MeanArterialPressure: number;
  DateStamp: Date;
  PreviousReadings: BloodPressureReading[]; // Specify the type of array elements
  AlertsReminders: Reminder[]; // Specify the type of array elements
  GraphsCharts: object;
}

// Define additional types for array elements
interface BloodPressureReading {
  SystolicPressure: number;
  DiastolicPressure: number;
  PulseRate: number;
  DateStamp: Date;
}

interface Reminder {
  message: string;
  date: Date;
}
