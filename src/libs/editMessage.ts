const editMessage = (message: string) => {
  return message.replace(/<:/, "").replace(/:[0-9].*>/, "");
};

export default editMessage;
