export default {
  text: null,
  email: /([\w_.\-+])+@([\w-]+\.)+([\w]{2,10})+$/i,
  telephone: /^[+]*[(]{0,1}[0-9]{2,}[)]{0,1}[0-9]{6,}$/i,
  date: /^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]d|3[01])[/](14|21)d{2}$/i,
  textarea: null,
  select: null,
  checkbox: null,
  radio: null,
  url: /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/i,
  file: null,
  number: /^-?\d*\.?\d+$/i
};
