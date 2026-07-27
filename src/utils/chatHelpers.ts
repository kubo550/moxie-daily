import { QuoteType } from '@/types/QuoteType.ts';

export const getGreetingMessageForCoach = (type: QuoteType) => {
  switch (type) {
    case QuoteType.affirmation:
      return "Hey, you're here – that's already a powerful first step. 💛 Ready for a little boost to your inner strength? 🌿";
    case QuoteType.devotional:
      return "Welcome. 🙏 Let's take a moment for reflection and spiritual encouragement. Are you open to a word of comfort today?";
    case QuoteType.motivation:
      return "Hi. I'm here to help — whatever kind of day you're having. What's on your mind?";
    case QuoteType.anxiety_relief:
      return "Take a deep breath. You're safe here. 🌊 Let's work through what's weighing on your mind together.";
    case QuoteType.build_confidence:
      return "You're more capable than you know. 💪 Let's build that unshakeable confidence step by step.";
    case QuoteType.meditation:
      return 'Welcome to stillness. 🧘 Ready to quiet the noise and reconnect with your center?';
    case QuoteType.pre_workout_motivation:
      return "Let's go! 💥 Time to turn up the intensity and crush your workout. Ready to get after it?";
    case QuoteType.healthy_habits:
      return "Hi. Small steps count here — one day at a time. What would you like to take care of today?";
    case QuoteType.joyful_living:
      return "Hi. However today feels right now, it can shift. What's going on for you?";
    case QuoteType.productivity_boost:
      return "Time to get things done! ⚡ Let's maximize your productivity and crush your to-do list.";
    case QuoteType.forgiveness_letting_go:
      return "Holding on can be heavy. 🕊️ Ready to release what's weighing you down and move forward?";
    case QuoteType.focus:
      return "Distractions everywhere? 🎯 Let's sharpen your focus and get you locked in.";
    case QuoteType.entrepreneur_fuel:
      return "Building something great takes grit. 💼 Let's fuel your entrepreneurial fire and push forward.";
    case QuoteType.personal_growth:
      return "Growth is a journey, not a destination. 🌳 Ready to level up and become your best self?";
    case QuoteType.energy_renewal:
      return "Feeling drained? ⚡ Let's recharge your energy and get you back to full power.";
    case QuoteType.walk_in_faith:
      return "Faith is taking the next step even when you can't see the staircase. ✨ Let's walk this path together.";
    case QuoteType.mental_health:
      return "Your mental health matters. 🧠 Let's check in and talk about what you need today.";
    case QuoteType.recovery_strength:
      return "Recovery is courage in action. 🌟 One step, one day, one victory at a time. You've got this.";
    case QuoteType.hope_healing:
      return "Even in darkness, there is light. 🌅 Let's find hope and healing together.";
    case QuoteType.gratitude:
      return "Gratitude transforms everything. 🙏 What are we thankful for today?";
    case QuoteType.discipline:
      return "Discipline is the bridge between goals and achievement. 💪 Let's build that unwavering commitment.";
    default:
      return 'Hi there! Which kind of support are you in the mood for today – affirmation, motivation, or something spiritual?';
  }
};

export const getGreetingCustomerMessageSuggestions = (type: QuoteType) => {
  switch (type) {
    case QuoteType.affirmation:
      return [
        'Tell me something to calm my mind.',
        'I need a gentle reminder of my worth.',
        'Affirm me – I feel a little off today.',
        'Give me something positive to hold onto.',
      ];
    case QuoteType.devotional:
      return [
        'Share a comforting verse with me.',
        'I need spiritual encouragement.',
        "Remind me that I'm not alone.",
        'Give me something to pray on today.',
      ];
    case QuoteType.motivation:
      return [
        'I need some encouragement today.',
        "Tell me I've got this – even if I don't feel it yet.",
        "I'm having a hard time and don't know what to do.",
      ];
    case QuoteType.anxiety_relief:
      return [
        "I'm feeling overwhelmed right now.",
        'Help me calm down.',
        'I need to release this tension.',
        "Ground me – I'm spiraling.",
      ];
    case QuoteType.build_confidence:
      return [
        "I don't believe in myself today.",
        'Remind me of my strengths.',
        'I need to feel capable again.',
        "Build me up – I'm doubting everything.",
      ];
    case QuoteType.meditation:
      return [
        'Guide me into stillness.',
        'I need to quiet my mind.',
        'Help me find peace right now.',
        'Take me somewhere calm.',
      ];
    case QuoteType.pre_workout_motivation:
      return [
        'Get me hyped for this workout!',
        'I need energy to push through.',
        "I'm not feeling it today – motivate me.",
        'Pump me up!',
      ];
    case QuoteType.healthy_habits:
      return [
        'Help me build better habits.',
        'I want to take better care of myself.',
        "I'm struggling to stay consistent.",
        'Give me health tips.',
      ];
    case QuoteType.joyful_living:
      return [
        'Help me find more joy today.',
        'I want to feel happier.',
        'Remind me of the good things.',
        "I'm feeling a bit down.",
      ];
    case QuoteType.productivity_boost:
      return [
        "I'm procrastinating – help me focus.",
        'I have so much to do today.',
        'Give me a productivity boost.',
        "I can't seem to get started.",
      ];
    case QuoteType.forgiveness_letting_go:
      return [
        "I'm holding onto something I need to release.",
        'Help me forgive and move on.',
        "I can't let go of the past.",
        'I need closure.',
      ];
    case QuoteType.focus:
      return [
        "I'm so distracted today.",
        'Help me lock in and concentrate.',
        'I need laser focus.',
        "I can't stay on task.",
      ];
    case QuoteType.entrepreneur_fuel:
      return [
        "I'm building something big.",
        'Give me entrepreneurial motivation.',
        "I'm facing challenges in my business.",
        'Fuel my hustle.',
      ];
    case QuoteType.personal_growth:
      return [
        'I want to become a better version of myself.',
        'Help me grow.',
        "I'm ready to level up.",
        'Give me wisdom.',
      ];
    case QuoteType.energy_renewal:
      return [
        "I'm exhausted.",
        'I need an energy boost.',
        'Help me recharge.',
        "I'm running on empty.",
      ];
    case QuoteType.walk_in_faith:
      return [
        'Strengthen my faith.',
        "I'm struggling to believe.",
        'Help me trust the journey.',
        'I need spiritual guidance.',
      ];
    case QuoteType.mental_health:
      return [
        "I'm not okay today.",
        'I need mental health support.',
        "I'm struggling emotionally.",
        'Help me feel better.',
      ];
    case QuoteType.recovery_strength:
      return [
        "I'm in recovery and need support.",
        "Today is hard – keep me strong.",
        'One day at a time.',
        "I'm fighting to stay clean.",
      ];
    case QuoteType.hope_healing:
      return [
        "I'm going through a tough time.",
        'I need hope.',
        'Help me heal.',
        "I'm feeling broken.",
      ];
    case QuoteType.gratitude:
      return [
        'Help me appreciate what I have.',
        'I want to practice gratitude.',
        "Remind me of life's blessings.",
        'I need perspective.',
      ];
    case QuoteType.discipline:
      return [
        "I'm lacking discipline.",
        'Help me stay committed.',
        "I keep breaking my promises to myself.",
        'I need accountability.',
      ];
    default:
      return [];
  }
};
