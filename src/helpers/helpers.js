const shortenDescription = (desc) => {
  const partialText = desc.substring(0, 10);
  const finalText = partialText + "...";
  if (desc.length > 10) return finalText;
  return partialText;
};

export { shortenDescription };
