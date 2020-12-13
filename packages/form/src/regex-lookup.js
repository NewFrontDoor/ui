const regexLookup = {
  text: null,
  email: /([\w_.\-+])+@([\w-]+\.)+(\w{2,10})+$/i,
  telephone: /^\+*\({0,1}\d{2,}\){0,1}\d{6,}$/i,
  date: /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12]d|3[01])\/(14|21)d{2}$/i,
  textarea: null,
  select: null,
  checkbox: null,
  radio: null,
  url: /[(htps)?:/w.\w@%+~#=]{2,256}\.[a-z]{2,6}\b([-\w@:%+.~#?&/=]*)/i,
  file: null,
  number: /^-?\d*\.?\d+$/i
};

export default regexLookup;
