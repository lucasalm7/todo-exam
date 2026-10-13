// Changes the background color of the page
export const changeBackgroundColor = (color: string): void => {
  document.body.style.backgroundColor = color;
};

// Attaches the input listener to the color picker element
export const initializeColorPicker = (): void => {
  const colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
  if (colorPicker) {
    colorPicker.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      changeBackgroundColor(target.value);
    });
  } else {
    console.error('Color picker element not found');
  }
};