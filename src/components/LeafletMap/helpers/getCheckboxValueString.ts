export default function getCheckboxValueString(className: string) {
  const elementsCheckbox = document.querySelectorAll(`.${className}:checked`);
  const tempArray: any[] = [];
  elementsCheckbox.forEach((vehicle: any) => {
    tempArray.push(vehicle.value);
  });
  if (elementsCheckbox.length === 0) {
    tempArray.push("-1");
  }
  return tempArray;
}
