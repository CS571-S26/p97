import pushUpImage from "../assets/push-up.jpg";


let exercises = [
  {
    id: 1,
    name: "Push-Up",
    muscleGroup: "Chest",
    difficulty: "Beginner",
    equipment: "None",
    description: "A basic upper body exercise that builds chest, shoulders, and triceps.",
    details: "Basic pushing movement.",
    tips: [
      "Keep body straight.",
      "Control the movement."
    ],
    image: pushUpImage,
  },
  {
    id: 2,
    name: "Pull-Up",
    muscleGroup: "Back",
    difficulty: "Intermediate",
    equipment: "Pull-Up Bar",
    description: "A pulling exercise that targets the back and biceps.",
    details: "Basic pulling movement.",
    tips: [
      "Avoid swinging.",
      "Pull with control."
    ]
  },
  {
    id: 3,
    name: "Dip",
    muscleGroup: "Triceps",
    difficulty: "Intermediate",
    equipment: "Dip Bars",
    description: "A pushing exercise that mainly works the triceps and chest.",
    details: "Good for upper body pushing strength.",
    tips: [
      "Move slowly.",
      "Keep shoulders controlled."
    ]
  },
  {
    id: 4,
    name: "Squat",
    muscleGroup: "Legs",
    difficulty: "Beginner",
    equipment: "None",
    description: "A lower body exercise that strengthens the legs and glutes.",
    details: "Basic lower body movement.",
    tips: [
      "Keep feet flat.",
      "Keep chest up."
    ]
  },
  {
    id: 5,
    name: "Plank",
    muscleGroup: "Core",
    difficulty: "Beginner",
    equipment: "None",
    description: "A core stability exercise that trains abdominal endurance.",
    details: "Basic core hold.",
    tips: [
      "Keep hips level.",
      "Breathe normally."
    ]
  },
  {
    id: 6,
    name: "Pike Push-Up",
    muscleGroup: "Shoulders",
    difficulty: "Intermediate",
    equipment: "None",
    description: "A shoulder-focused push-up variation.",
    details: "Helps build shoulder strength.",
    tips: [
      "Keep hips high.",
      "Lower with control."
    ]
  },
  {
    id: 7,
    name: "Chin-Up",
    muscleGroup: "Back",
    difficulty: "Intermediate",
    equipment: "Pull-Up Bar",
    description: "A pull-up variation with more bicep use.",
    details: "Uses an underhand grip.",
    tips: [
      "Use full range.",
      "Do not swing."
    ]
  },
  {
    id: 8,
    name: "L-Sit",
    muscleGroup: "Core",
    difficulty: "Advanced",
    equipment: "Parallettes",
    description: "A core hold with legs straight out.",
    details: "Builds core and hip flexor strength.",
    tips: [
      "Keep arms straight.",
      "Start tucked if needed."
    ]
  },
  {
    id: 9,
    name: "Lunge",
    muscleGroup: "Legs",
    difficulty: "Beginner",
    equipment: "None",
    description: "A simple single-leg exercise.",
    details: "Good for legs and balance.",
    tips: [
      "Step with control.",
      "Keep balance."
    ]
  },
  {
    id: 10,
    name: "Burpee",
    muscleGroup: "Full Body",
    difficulty: "Intermediate",
    equipment: "None",
    description: "A full body conditioning exercise.",
    details: "Combines a squat, plank, and jump.",
    tips: [
      "Move safely.",
      "Slow down if needed."
    ]
  }
];

export default exercises;