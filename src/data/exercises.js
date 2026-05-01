// To add exercise images later:
// 1. Put images in src/assets/exercise-cards/
// 2. Use the image names listed in imageName.
// 3. Example: imageName: "push-up" looks for push-up.jpeg, push-up.jpg, push-up.png, or push-up.webp

let exercises = [
  {
    id: 1,
    name: "Push-Up",
    muscleGroup: "Chest",
    difficulty: "Beginner",
    equipment: "None",
    description: "A basic upper body exercise that builds the chest, shoulders, and triceps.",
    details: "Start in a plank position, lower your chest toward the floor, then press back up.",
    tips: [
      "Keep your body straight.",
      "Do not let your hips sag.",
      "Use a controlled pace."
    ],
    imageName: "push-up",
    imageAlt: "Person doing a push-up"
  },
  {
    id: 2,
    name: "Pull-Up",
    muscleGroup: "Back",
    difficulty: "Intermediate",
    equipment: "Pull-Up Bar",
    description: "A pulling exercise that works the back and biceps.",
    details: "Hang from a bar and pull until your chin reaches or passes the bar.",
    tips: [
      "Avoid swinging.",
      "Pull with your back first.",
      "Lower yourself with control."
    ],
    imageName: "pull-up",
    imageAlt: "Person doing a pull-up"
  },
  {
    id: 3,
    name: "Dip",
    muscleGroup: "Triceps",
    difficulty: "Intermediate",
    equipment: "Dip Bars",
    description: "A pushing exercise that mainly trains the triceps, chest, and shoulders.",
    details: "Support yourself on dip bars, lower your body, then press back up.",
    tips: [
      "Keep your shoulders controlled.",
      "Do not drop too quickly.",
      "Stop if your shoulders hurt."
    ],
    imageName: "dip",
    imageAlt: "Person doing dips"
  },
  {
    id: 4,
    name: "Squat",
    muscleGroup: "Legs",
    difficulty: "Beginner",
    equipment: "None",
    description: "A lower body exercise that strengthens the legs and glutes.",
    details: "Stand with feet about shoulder-width apart, bend your knees, then stand back up.",
    tips: [
      "Keep your feet flat.",
      "Keep your chest up.",
      "Move through a comfortable range."
    ],
    imageName: "squat",
    imageAlt: "Person doing a squat"
  },
  {
    id: 5,
    name: "Plank",
    muscleGroup: "Core",
    difficulty: "Beginner",
    equipment: "None",
    description: "A core hold that trains abdominal strength and stability.",
    details: "Hold a straight body position on your forearms or hands.",
    tips: [
      "Keep your hips level.",
      "Breathe normally.",
      "Stop before your form breaks."
    ],
    imageName: "plank",
    imageAlt: "Person holding a plank"
  },
  {
    id: 6,
    name: "Pike Push-Up",
    muscleGroup: "Shoulders",
    difficulty: "Intermediate",
    equipment: "None",
    description: "A push-up variation that focuses more on the shoulders.",
    details: "Keep your hips high and lower your head toward the floor before pressing back up.",
    tips: [
      "Keep your hips high.",
      "Lower with control.",
      "Start with a small range if needed."
    ],
    imageName: "pike-push-up",
    imageAlt: "Person doing a pike push-up"
  },
  {
    id: 7,
    name: "Chin-Up",
    muscleGroup: "Back",
    difficulty: "Intermediate",
    equipment: "Pull-Up Bar",
    description: "A pull-up variation that uses more biceps because of the underhand grip.",
    details: "Hang with palms facing you and pull until your chin reaches or passes the bar.",
    tips: [
      "Use a full range of motion.",
      "Do not swing.",
      "Control the lower part."
    ],
    imageName: "chin-up",
    imageAlt: "Person doing a chin-up"
  },
  {
    id: 8,
    name: "L-Sit",
    muscleGroup: "Core",
    difficulty: "Advanced",
    equipment: "Parallettes",
    description: "A core hold where your legs stay straight in front of you.",
    details: "Press down through your arms and hold your legs out in an L shape.",
    tips: [
      "Keep your arms straight.",
      "Start tucked if needed.",
      "Point your toes and stay tight."
    ],
    imageName: "l-sit",
    imageAlt: "Person doing an L-sit"
  },
  {
    id: 9,
    name: "Lunge",
    muscleGroup: "Legs",
    difficulty: "Beginner",
    equipment: "None",
    description: "A single-leg movement that builds leg strength and balance.",
    details: "Step forward, lower your body, then push back to standing.",
    tips: [
      "Step with control.",
      "Keep your balance.",
      "Do not let your front knee cave inward."
    ],
    imageName: "lunge",
    imageAlt: "Person doing a lunge"
  },
  {
    id: 10,
    name: "Burpee",
    muscleGroup: "Full Body",
    difficulty: "Intermediate",
    equipment: "None",
    description: "A full body conditioning exercise.",
    details: "Move from standing to plank, return to standing, and jump or stand tall.",
    tips: [
      "Move safely before moving fast.",
      "Step back instead of jumping if needed.",
      "Keep breathing steady."
    ],
    imageName: "burpee",
    imageAlt: "Person doing a burpee"
  },
  {
    id: 11,
    name: "Planche",
    muscleGroup: "Shoulders",
    difficulty: "Advanced",
    equipment: "None",
    description: "An advanced straight-arm hold where the body is supported by the hands.",
    details: "Lean forward with locked arms and keep your body tight while your feet leave the ground.",
    tips: [
      "Build up with tuck planche holds.",
      "Keep elbows locked.",
      "Do short quality holds."
    ],
    imageName: "planche",
    imageAlt: "Person holding a planche"
  },
  {
    id: 12,
    name: "Human Flag",
    muscleGroup: "Core",
    difficulty: "Advanced",
    equipment: "Pole or Stall Bars",
    description: "A sideways body hold that requires strong core, shoulders, and pulling strength.",
    details: "Hold a vertical pole or bars and keep your body straight out to the side.",
    tips: [
      "Start with tucked flag holds.",
      "Push with the bottom arm.",
      "Keep your core tight."
    ],
    imageName: "human-flag",
    imageAlt: "Person doing a human flag"
  },
  {
    id: 13,
    name: "Front Lever",
    muscleGroup: "Back",
    difficulty: "Advanced",
    equipment: "Pull-Up Bar",
    description: "A straight-body hanging hold that trains the back and core.",
    details: "Hang from a bar and raise your body until it is horizontal and facing upward.",
    tips: [
      "Start with tuck front levers.",
      "Keep arms straight.",
      "Pull the bar down toward your hips."
    ],
    imageName: "front-lever",
    imageAlt: "Person holding a front lever"
  },
  {
    id: 14,
    name: "Back Lever",
    muscleGroup: "Back",
    difficulty: "Advanced",
    equipment: "Rings or Pull-Up Bar",
    description: "A straight-body hold where the body is horizontal and facing the floor.",
    details: "Move into an inverted hang, lower with control, and hold a straight body line.",
    tips: [
      "Start tucked.",
      "Keep shoulders active.",
      "Progress slowly."
    ],
    imageName: "back-lever",
    imageAlt: "Person holding a back lever"
  },
  {
    id: 15,
    name: "Muscle-Up",
    muscleGroup: "Full Body",
    difficulty: "Advanced",
    equipment: "Pull-Up Bar",
    description: "A pull-up and dip combined into one powerful movement.",
    details: "Pull high, transition over the bar, then press up to locked arms.",
    tips: [
      "Master pull-ups and dips first.",
      "Pull explosively.",
      "Practice the transition."
    ],
    imageName: "muscle-up",
    imageAlt: "Person doing a muscle-up"
  },
  {
    id: 16,
    name: "Handstand Push-Up",
    muscleGroup: "Shoulders",
    difficulty: "Advanced",
    equipment: "Wall",
    description: "A vertical pushing exercise that strongly works the shoulders and triceps.",
    details: "Kick up to a handstand against a wall, lower your head carefully, then press up.",
    tips: [
      "Use a wall for support.",
      "Keep your core tight.",
      "Control the lower part."
    ],
    imageName: "handstand-push-up",
    imageAlt: "Person doing a handstand push-up"
  },
  {
    id: 17,
    name: "Pistol Squat",
    muscleGroup: "Legs",
    difficulty: "Advanced",
    equipment: "None",
    description: "A single-leg squat that builds leg strength, mobility, and balance.",
    details: "Squat on one leg while keeping the other leg straight in front of you.",
    tips: [
      "Hold a support if needed.",
      "Keep the working foot flat.",
      "Use partial reps first."
    ],
    imageName: "pistol-squat",
    imageAlt: "Person doing a pistol squat"
  },
];

export default exercises;
