const loadScript = async (resourceUrl) => new Promise((resolve, reject) => {
  const script = document.createElement('script');
  script.src = resourceUrl;

  script.onload = () => resolve(true);
  script.onerror = () => reject();

  document.body.appendChild(script);
});

export default loadScript;
