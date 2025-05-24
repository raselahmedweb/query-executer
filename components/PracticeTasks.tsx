"use client";

import { query } from "@/lib/db";
import { QueryResponse } from "../types/query";

interface PracticeTasksProps {
  connectionString: string;
}

export default function PracticeTasks({
  connectionString,
}: PracticeTasksProps) {
  const setupDummyData = async () => {
    const queries = [
      `CREATE TABLE IF NOT EXISTS students (id SERIAL PRIMARY KEY, name VARCHAR(100), grade INT);`,
      `INSERT INTO students (name, grade) VALUES ('Alice', 85), ('Bob', 90), ('Charlie', 78);`,
    ];
    for (const query of queries) {
      await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql: query, connectionString }),
      });
    }
    alert("Dummy data created successfully!");
  };
  const dummyQueries = [
    {
      id: 1,
      query: `
  CREATE TABLE patients (
    patient_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    date_of_birth DATE,
    gender CHAR(1),
    contact_number VARCHAR(15)
);

  INSERT INTO patients (first_name, last_name, date_of_birth, gender, contact_number) VALUES
    ('John', 'Doe', '1990-05-15', 'M', '555-0101'),
    ('Jane', 'Smith', '1985-09-22', 'F', '555-0102'),
    ('Michael', 'Brown', '1978-03-10', 'M', '555-0103'),
    ('Emily', 'Davis', '1995-12-30', 'F', '555-0104'),
    ('Robert', 'Wilson', '1982-07-18', 'M', '555-0105'),
    ('Sarah', 'Taylor', '1992-04-05', 'F', '555-0106'),
    ('David', 'Miller', '1988-11-25', 'M', '555-0107'),
    ('Lisa', 'Anderson', '1998-06-14', 'F', '555-0108'),
    ('Thomas', 'Clark', '1975-01-09', 'M', '555-0109'),
    ('Anna', 'White', '1993-08-20', 'F', '555-0110');`,
    },
    {
      id: 2,
      query: `
  CREATE TABLE doctors (
    doctor_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    specialty VARCHAR(50),
    contact_number VARCHAR(15)
);

  INSERT INTO doctors (first_name, last_name, specialty, contact_number) VALUES
    ('James', 'Lee', 'Cardiology', '555-0201'),
    ('Mary', 'Johnson', 'Neurology', '555-0202'),
    ('Robert', 'Garcia', 'Orthopedics', '555-0203'),
    ('Patricia', 'Martinez', 'Pediatrics', '555-0204'),
    ('William', 'Lopez', 'Surgery', '555-0205');
        `,
    },
    {
      id: 3,
      query: `
  CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(patient_id),
    doctor_id INT REFERENCES doctors(doctor_id),
    appointment_date DATE,
    appointment_time TIME
);

  INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time) VALUES
    (1, 1, '2025-05-25', '10:00:00'),
    (2, 2, '2025-05-25', '11:00:00'),
    (3, 3, '2025-05-26', '09:30:00'),
    (4, 4, '2025-05-26', '14:00:00'),
    (5, 5, '2025-05-27', '13:00:00'),
    (6, 1, '2025-05-27', '15:00:00'),
    (7, 2, '2025-05-28', '10:30:00'),
    (8, 3, '2025-05-28', '12:00:00'),
    (9, 4, '2025-05-29', '11:30:00'),
    (10, 5, '2025-05-29', '14:30:00');
        `,
    },
  ];
  const tasks = [
    {
      id: 1,
      description:
        "List all patients with their full names and contact numbers.",
    },
    { id: 2, description: "Find all doctors specializing in 'Cardiology'." },
    {
      id: 3,
      description:
        "List all appointments scheduled for May 26, 2025, including patient and doctor names.",
    },
    {
      id: 4,
      description:
        "Count the number of appointments for each doctor.",
    },
    {
      id: 5,
      description:
        "Find patients who are older than 30 years as of today (May 24, 2025).",
    },
    {
      id: 6,
      description:
        "List all appointments where the doctor is 'Patricia Martinez'.",
    },
    {
      id: 7,
      description:
        "Find the earliest appointment date for each patient.",
    },
    {
      id: 8,
      description:
        "Update the contact number of 'John Doe' to '555-0111'.",
    },
    {
      id: 9,
      description:
        "Delete all appointments scheduled before May 27, 2025.",
    },
    {
      id: 10,
      description:
        "Find the total number of patients and doctors combined.",
    },
  ];

  return (
    <div className="p-4">
      <ul className="list-decimal pl-5">
        {dummyQueries.map((task) => (
          <li key={task.id} className="mb-2">
            <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
              {task.query}
            </pre>
          </li>
        ))}
      </ul>
      <ul className="list-decimal pl-5">
        {tasks.map((task) => (
          <li key={task.id} className="mb-2">
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
