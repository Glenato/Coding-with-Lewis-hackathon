var images = [["./Captchas/Best code editor theme/Atom One Dark.png","./Captchas/Best code editor theme/Community Material Theme.png","./Captchas/Best code editor theme/Dracula Theme.png","./Captchas/Best code editor theme/Github Dark.png","./Captchas/Best code editor theme/Material Theme.png","./Captchas/Best code editor theme/Monokai Classic.png","./Captchas/Best code editor theme/One Dark PRo.png","./Captchas/Best code editor theme/PowerShell ISE.png","./Captchas/Best code editor theme/Vscode Dark.png","./Captchas/Best code editor theme/Winter is Coming.png"],["./Captchas/Best programming language/C.png","./Captchas/Best programming language/C++.png","./Captchas/Best programming language/GO.png","./Captchas/Best programming language/Java script.png","./Captchas/Best programming language/Swift.png","./Captchas/Best programming language/Rust.png","./Captchas/Best programming language/Ruby.png","./Captchas/Best programming language/Python.png","./Captchas/Best programming language/php.png","./Captchas/Best programming language/Java.png"]]
var question = [["What is the best code editor theme ?"],["What is the best language ?"]]

function get_random_num(min, max){
    return Math.floor(Math.random()*(max-min ))+min;
}

var what_captcha = get_random_num(0,2);
var already_used_images = [];

function get_captcha_image_path(){
    
    let next_image = null;

    if (already_used_images.length === images[what_captcha].length){
        console.log("\n\nError there are not enough images for the captcha number "+ what_captcha+ ". There have to be at least 9 images\n\n");
    }
    while (next_image===null){
        next_image = images[what_captcha][get_random_num(0, images[what_captcha].length)];
        if (already_used_images.includes(next_image)){
            next_image = null;
        }
    }
    already_used_images.push(next_image);
    return next_image;
}

function reset_captcha(){
    what_captcha = null;
    already_used_images = null;
}

function loadImages() {
    localStorage.setItem("state", "final");
    const gridContainer = document.getElementById('imageGrid');

    for (let i = 0; i<9; i++){
        path = get_captcha_image_path();
        console.log(path);
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        const imgElement = document.createElement('img');
        imgElement.src = path;
        imgElement.alt = 'Image';

        gridItem.appendChild(imgElement);
        gridContainer.appendChild(gridItem);
    }
}
function ask_question(){
    const questionElement = document.getElementById("captcha-question");
    questionElement.textContent = question[what_captcha];
}

function replaceButtonWithImage(buttonId, imagepath) {
    const button = document.getElementById("b"+buttonId);
    const img = document.createElement('img');
    img.classList.add("captcha-image");
    img.src = imagepath;
    img.alt = 'Replaced Image';
    img.style.width = '100%';
    img.style.height = '100%';
    button.parentNode.replaceChild(img, button);
}

function get_button_press(num){
    console.log(num)
    let rnum = num;
    while (rnum == num){
        rnum = get_random_num(1,10);
    }
    replaceButtonWithImage(rnum, "./Captcha images/Correct and wrong/Correct.png");
    replaceButtonWithImage(num, "./Captcha images/Correct and wrong/Wrong.png");
    setTimeout(() => {
    console.log("Waiting");window.location.href = "./loading_screen.html"}, 2000);
    

}

window.onload = loadImages(), ask_question();