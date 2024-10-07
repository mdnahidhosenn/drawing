const canvas = document.querySelector('canvas'); // 1
toolBtns = document.querySelectorAll('.tool') // 19
fillColor = document.querySelector('#fill-color') // 36
sizeSlider = document.querySelector('#size-slider') // 55
colorBtn = document.querySelectorAll('.colors .option') // 57
colorPicker = document.querySelector('#color-picker') // 66
clearCanvas = document.querySelector('.clear-canvas') // 71
saveImg = document.querySelector('.save-img') // 74

ctx = canvas.getContext('2d') // 2

let prevMouseX , prevMouseY, // 30
 isDrawing = false ,// 10 
brushWidth = 5 ; // 18
selectedTool = 'brush' // 24
selectedColor = '#000' // 62
let snapShot; // 33

const setCanvasBackground =()=> { // 80
 ctx.fillStyle = '#fff'; // 81
 ctx.fillRect(0,0, canvas.width , canvas.height); // 82
 ctx.fillStyle = selectedColor; // 83
}

window.addEventListener('load',()=>{ //7
 canvas.width = canvas.offsetWidth;// 8
 canvas.height = canvas.offsetHeight; // 9
 setCanvasBackground(); // 84
})

const drawRects = (e)=> { // 28
 if(!fillColor.checked) { // 37

 return ctx.strokeRect(e.offsetX , e.offsetY , prevMouseX - e.offsetX , prevMouseY - e.offsetY); // 29
}
ctx.fillRect(e.offsetX , e.offsetY , prevMouseX - e.offsetX , prevMouseY - e.offsetY); // 38

}
const drawCircle = (e)=>{ // 41 
 ctx.beginPath() // 45
 let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX) , 2)  + Math.pow((prevMouseY - e.offsetY) ,2) ) // 44
ctx.arc(prevMouseX , prevMouseY ,radius, 0,2 *Math.PI); // 42
 fillColor.checked ? ctx.fill() : ctx.stroke() // 43
}
const drawTringle = (e) => { // 48

 ctx.beginPath() // 49
 ctx.moveTo(prevMouseX, prevMouseY); // 50
 ctx.lineTo(e.offsetX , e.offsetY) ; // 51
 ctx.lineTo( prevMouseX * 2 - e.offsetX, e.offsetY) // 53
 ctx.closePath() // 54
 fillColor.checked ? ctx.fill() : ctx.stroke() // 52
}

const startDraw = (e) => { // 13
isDrawing  = true; // 14
prevMouseX = e.offsetX; // 31
prevMouseY = e.offsetY; // 32
ctx.beginPath() // 16
ctx.lineWidth = brushWidth // 17
ctx.strokeStyle = selectedColor // 64
ctx.fillStyle = selectedColor; // 65
snapShot = ctx.getImageData(0,0,canvas.width , canvas.height); // 34
}
const drawing = (e)=> { //4 
 if(!isDrawing) return ; // 11
 ctx.putImageData(snapShot, 0 ,0) // 35
 if(selectedTool === 'brush' || selectedTool === 'eraser'/* 69*/ ) { // 26
  ctx.strokeStyle = selectedTool === 'eraser' ? '#fff' : selectedColor; // 70
  ctx.lineTo(e.offsetX , e.offsetY); //5
  ctx.stroke(); //6
 }else if (selectedTool === 'rectangle'){ // 27
  drawRects(e);
 }
 else if (selectedTool === 'circle'){ // 39
  drawCircle(e); // 40 
 }else { // 46
  drawTringle(e)  // 47
 }
}
saveImg.addEventListener('click',()=>{ // 75

const link = document.createElement('a'); // 76
link.download = `${Date.now()}.jpg`; // 77 
link.href = canvas.toDataURL(); // 78 ;
link.click(); // 79

})

clearCanvas.addEventListener('click',()=>{ // 72

 ctx.clearRect(0,0,canvas.width, canvas.height); // 73
 setCanvasBackground(); // 85
})

colorPicker.addEventListener('change',()=> { // 67
 colorPicker.parentElement.style.background = colorPicker.value; // 68
 colorPicker.parentElement.click() // 69
})
colorBtn.forEach(btn => { // 58
 btn.addEventListener('click',()=>{ // 59
  document.querySelector('.options  .selected').classList.remove('selected'); // 60
  btn.classList.add('selected'); // 61
  selectedColor = window.getComputedStyle(btn).getPropertyValue('background-color') // 63

 })
})

sizeSlider.addEventListener('change',()=> brushWidth = sizeSlider.value) // 56

toolBtns.forEach(btn => { // 20
 btn.addEventListener('click',()=> { // 21
  document.querySelector('.options .active').classList.remove('active') // 22
  btn.classList.add('active') // 23
  selectedTool = btn.id;  // 25
 })
});
canvas.addEventListener('mousemove',drawing) // 3
canvas.addEventListener('mouseup',()=> isDrawing = false) // 15
canvas.addEventListener('mousedown',startDraw) // 12



//   34:17 / 50:46