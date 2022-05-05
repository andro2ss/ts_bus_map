export default function getCheckboxValueNum(className: string) {
  const elementsCheckbox = document.querySelectorAll(`.${className}:checked`);
  const tempArray: any[] = [];
  elementsCheckbox.forEach((vehicle: any) => {
    tempArray.push(Number(vehicle.value));
  });
  if (elementsCheckbox.length === 0) {
    tempArray.push(-1);
  }
  return tempArray;
}
