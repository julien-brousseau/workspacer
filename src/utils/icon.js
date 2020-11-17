function icon (url) {
  return 'https://' + (new URL(url)).hostname + '/favicon.ico';
}

export { icon };
