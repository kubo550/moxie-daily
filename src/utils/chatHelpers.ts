import { QuoteType } from '@/types/QuoteType.ts';

export const getGreetingMessageForCoach = (type: QuoteType) => {
  switch (type) {
    case QuoteType.affirmation:
      return "Hey, you're here – that's already a powerful first step. 💛 Ready for a little boost to your inner strength? 🌿";
    case QuoteType.devotional:
      return 'Welcome. 🙏 Let’s take a moment for reflection and spiritual encouragement. Are you open to a word of comfort today?';
    case QuoteType.motivation:
      return 'Hey! 🚀 You’ve got goals, and I’ve got the energy. Ready to fuel your day with some serious motivation?';
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
        'Remind me that I’m not alone.',
        'Give me something to pray on today.',
      ];
    case QuoteType.motivation:
      return [
        'Give me a reason to keep pushing.',
        'I need some fire to start my day.',
        'Tell me I’ve got this – even if I don’t feel it yet.',
      ];
    default:
      return [];
  }
};
