const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img img"),
resetFilterBtn = document.querySelector(".reset-filter"),
saveImageBtn = document.querySelector(".save-img"),
chooseIMgBtn = document.querySelector(".choose-img");

let brightness = 100, saturation = 100, inversion = 0, graysacle = 0;
let rotate = 0 , flipHorizontal = 1 , flipVertiacl = 1;

const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal} , ${flipVertiacl})`
    // previewImg.style.filter = `brightnes(${brightness})  saturate(${saturation}) invet(${inversion}) gray(${graysacle})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%)  grayscale(${graysacle}%)`;
}

const loadImage = () => {
    let file = fileInput.files[0];//getting user selected file
    if(!file) return; // return if user hasn't selected file
    previewImg.src = URL.createObjectURL(file);// passing file url img src
    previewImg.addEventListener("load" , () => {
        resetFilterBtn.click();// clicking reset btn, so the filter value is reset if the user select the new img 
         document.querySelector(".container").classList.remove("disable");  

    });
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => { // adding click event listener to all filter buttons
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if (option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        }else if (option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        }else if(option.value === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        }else {
            filterSlider.max = "100";
            filterSlider.value = graysacle;
            filterValue.innerText = `${graysacle}%`;
        }
    });
});

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".active");// getting selected filter btn

    if (selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if (selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    } else if (selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    }else {
        graysacle = filterSlider.value;
    }
    applyFilter();
};

rotateOptions.forEach(option => {
    option.addEventListener("click" , () => { // adding click event listener to all rotate buttons
        
        if (option.id === "left") {
            rotate -= 90; // if clicked btn is rotate , decrement rotate value by -90
        } else if (option.id === "right") {
            rotate += 90 ; // if clicked btn is rotate , incerment rotate value by +90 
        } else if (option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1 ; // if flipHorizontal value is 1, set this value to -1 else set  1
        }else {
            flipVertiacl = flipVertiacl === 1 ? -1 : 1 ;
        }

        applyFilter();
    });
});

const resetFilter = () => {
    brightness = 100; saturation = 100; inversion = 0; graysacle = 0;
    rotate = 0; flipHorizontal = 1; flipVertiacl = 1;
    filterOptions[0].click();
    applyFilter();
    // console.log("clicked");
};

const saveIamge = () => {
    const canvas = document.createElement("canvas");// creating canvas element 
    const ctx = canvas.getContext("2d"); // canvas.getcontex return a drawing on canvas
    canvas.width = previewImg.naturalWidth;// setting canvas width to actual image width
    canvas.height = previewImg.naturalHeight;// setting canvas height to actual image height

    // applying user selected filter to canvas filter
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%)  grayscale(${graysacle}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2); // translating canvas from center 
    if (rotate !== 0) { // if rotate value isn't 0, rotate the canvas
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertiacl)// flip canvas, horizontal / vertical
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a"); // creating <a> element
    link.download = "image.jpg"; // passing <a> tag dowload value to "image.jpg"
    link.href = canvas.toDataURL(); // passing <a> tag href value to canvas data url
    link.click(); // clicking <a> tag so the image dowloade
}

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click" , () => resetFilter());
saveImageBtn.addEventListener("click" , saveIamge);
chooseIMgBtn.addEventListener("click", () => fileInput.click());