let conversations = [
  "나무들이 겨울 옷으로 갈아입는다",
  "눈보러 왔어요! 거기는 추워요?",
  "오늘 같이 생일 축하했다",
  "태평양을 건너면 우리 볼 수 있지요?",
  "가족 사진 찍었다",
  "저 오늘 졸업했어요"
];

let conversationsEnglish = [
  "the leaves are changing colors",
  "we came to see snow! is it cold there?",
  "today we celebrated birthdays",
  "can we see each other across the pacific?",
  "we took a familly photo",
  "i graduated today"
];

let replies = [
  "저희는 아직 머물러 있나봐요",
  "응 따뜻하게 입고 재밌게 놀아!",
  "생일 축하해요!",
  "바다를 건너 기다리고 있다",
  "기록해 놓길 잘 하셨어요",
  "정말 축하한다! 그동안 수고 많았다"
];

let repliesEnglish = [
  "we're not ready for a change",
  "yes stay warm and have fun!",
  "please wish them a happy birthday!",
  "we are waiting across the ocean",
  "im glad you were able to take them",
  "congratulations! you've worked so hard"
];

let dragLeftText = "이 순간을 함께 했으면 좋았을 텐데";
let dragRightText = "i wish you were here";

let revealCount = 0;
let dropX = [];
let dropY = [];
let dropImg = [];

let randomImgX = 0;
let randomImgY = 0;
let selectedModalImg;

let imgs = [];
let imgs2 = [];
let sceneImgs = [];

let currentConvo = 0;
let interFont;
let index = 0;
let index2 = 0;
let timer = 0;

let showImage = false;
let isReplyImage = false;

let closeX = 0;
let closeY = 0;
let hasClosedImage = false;

let arrowOffset = 0;
let arrowSpeed = 0.5;

// async setup

async function setup() {
  createCanvas(windowWidth, windowHeight);

  interFont = await loadFont("Inter.ttf");

  imgs[0] = await loadImage("winter.jpg");
  imgs2[0] = await loadImage("winter2.jpg");

  imgs[1] = await loadImage("snow.jpg");
  imgs2[1] = await loadImage("snow2.jpg");

  imgs[2] = await loadImage("birthday1.jpg");
  imgs2[2] = await loadImage("birthday2.jpg");

  imgs[3] = await loadImage("beach.jpg");
  imgs2[3] = await loadImage("beach2.jpg");

  imgs[4] = await loadImage("family.jpg");
  imgs2[4] = await loadImage("family2.jpg");

  imgs[5] = await loadImage("grad.jpg");
  imgs2[5] = await loadImage("grad2.jpg");

// last scene
  
  sceneImgs[0] = await loadImage("1.JPG");
  sceneImgs[1] = await loadImage("2.JPG");
  sceneImgs[2] = await loadImage("3.JPG");
  sceneImgs[3] = await loadImage("4.JPG");
  sceneImgs[4] = await loadImage("5.JPG");
  sceneImgs[5] = await loadImage("6.JPG");
  sceneImgs[6] = await loadImage("7.JPG");
  sceneImgs[7] = await loadImage("8.JPG");
  sceneImgs[8] = await loadImage("9.JPG");
  sceneImgs[9] = await loadImage("10.JPG");
  sceneImgs[10] = await loadImage("11.JPG");
  sceneImgs[11] = await loadImage("12.JPG");
  sceneImgs[12] = await loadImage("13.JPG");
  sceneImgs[13] = await loadImage("14.JPG");
  sceneImgs[14] = await loadImage("15.JPG");
  sceneImgs[15] = await loadImage("16.JPG");
  sceneImgs[16] = await loadImage("17.JPG");
  sceneImgs[17] = await loadImage("18.JPG");
  sceneImgs[18] = await loadImage("19.JPG");
  sceneImgs[19] = await loadImage("20.JPG");
  sceneImgs[20] = await loadImage("21.JPG");
  sceneImgs[21] = await loadImage("22.JPG");
  sceneImgs[22] = await loadImage("23.JPG");
  sceneImgs[23] = await loadImage("24.JPG");
  sceneImgs[24] = await loadImage("25.JPG");
  sceneImgs[25] = await loadImage("26.JPG");
  sceneImgs[26] = await loadImage("27.JPG");
  sceneImgs[27] = await loadImage("28.JPG");
}

//text loop
function draw() {
  background("rgb(227 239 247)");

  let typeBlink = "";
  if (frameCount % 60 < 30) {
    typeBlink = "|";
  }

  let currentImg;
  let currentImg2;
  if (currentConvo < conversations.length) {
    currentImg = imgs[currentConvo];
    currentImg2 = imgs2[currentConvo];
  }

  if (showImage) {
    imageMode(CENTER);
    let imgW = width * 0.5;
    let imgH = height * 0.7;

    let centerX = width / 2;
    let centerY = height / 2;

    if (currentConvo >= conversations.length) {
      centerX = randomImgX;
      centerY = randomImgY;
      if (selectedModalImg) {
        image(selectedModalImg, centerX, centerY, imgW, imgH);
      }
    } else {
      if (isReplyImage && mouseIsPressed && currentImg2) {
        image(currentImg2, centerX, centerY, imgW, imgH);
      } else if (currentImg) {
        image(currentImg, centerX, centerY, imgW, imgH);
      }
    }

    closeX = centerX + imgW / 2 - 25;
    closeY = centerY - imgH / 2 + 25;

    fill(0, 0, 0, 0.6);
    noStroke();
    circle(closeX, closeY, 35);

    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("✕", closeX, closeY);

  } else {
    textFont(interFont);
    textSize(50);
    textLeading(50);

    // speech bubbles
    if (currentConvo < conversations.length) {
      let convoText = conversations[currentConvo];
      let convoEng = conversationsEnglish[currentConvo];
      let replyText = replies[currentConvo];
      let replyEng = repliesEnglish[currentConvo];

      let isEven = (currentConvo % 2 === 0);

      let x1 = width / 4;
      let x2 = (width * 3) / 4;
      if (isEven === false) {
        x1 = (width * 3) / 4;
        x2 = width / 4;
      }

      let y1 = height / 3;
      let y2 = height / 2;

      // first speech bubble
      let visible1 = "";
      for (let i = 0; i < index; i = i + 1) {
        visible1 = visible1 + convoText[i];
      }
      drawBubble(visible1, convoEng, x1, y1, isEven === false, index >= convoText.length);

      // reply bubble
      if (index2 > 0) {
        let visible2 = "";
        for (let i = 0; i < index2; i = i + 1) {
          visible2 = visible2 + replyText[i];
        }
        if (index2 < replyText.length) {
          visible2 = visible2 + typeBlink;
        }
        drawBubble(visible2, replyEng, x2, y2, isEven, index2 >= replyText.length);
      }

      // typing Timer
      timer = timer + 1;
      if (timer > 1) {
        if (index < convoText.length) {
          index = index + 1;
        } else if (index2 > 0 && index2 < replyText.length) {
          index2 = index2 + 1;
        }
        timer = 0;
      }

      // transition Arrow
      if (index >= convoText.length && index2 >= replyText.length && hasClosedImage) {
        arrowOffset = arrowOffset + arrowSpeed;
        if (arrowOffset > 15 || arrowOffset < 0) {
          arrowSpeed = arrowSpeed * -1;
        }

        let arrowX = width / 4;
        let arrowY = height * 0.72;

        fill(0, 0, 0, 0.6);
        textSize(60);
        textAlign(CENTER, CENTER);
        text(">", arrowX, arrowY);
      }

    // final scene
    } else {
      imageMode(CENTER);

      for (let i = 0; i < dropX.length; i = i + 1) {
        let oldPho = map(i, 0, dropX.length, 50, 255);

        push();
        tint(255, oldPho);
        image(dropImg[i], dropX[i], dropY[i], 180,200);
        pop();
      }
  
      let x1 = width / 4;
      let y1 = height / 3;
      let x2 = (width * 3) / 4;
      let y2 = height / 2;

      let visibleLeft = dragLeftText.substring(0, revealCount);
      let visibleRight = dragRightText.substring(0, revealCount);

      // "너도 여기 있었으면 좋았을 텐데"
      if (visibleLeft.length > 0) {
        let w1 = textWidth(visibleLeft);
        textAlign(LEFT, CENTER);
        fill(255);
        noStroke();
        rect(x1 - 25, y1 - 40, w1 + 50, 80, 20);
        triangle(x1 - 25, y1 + 20, x1 - 38, y1 + 42, x1 - 5, y1 + 40);

        fill("rgb(24 83 145)");
        text(visibleLeft, x1, y1);
      }

      // "i wish you were here"
      if (visibleRight.length > 0) {
        let w2 = textWidth(visibleRight);
        textAlign(RIGHT, CENTER);
        fill("rgb(24 83 145)");
        noStroke();
        rect(x2 - w2 - 25, y2 - 40, w2 + 50, 80, 20);
        triangle(x2 + 25, y2 + 20, x2 + 38, y2 + 42, x2 + 5, y2 + 40);

        fill(255);
        text(visibleRight, x2, y2);
      }
       arrowOffset = arrowOffset + arrowSpeed;
      if (arrowOffset > 15 || arrowOffset < 0) {
        arrowSpeed = arrowSpeed * -1;
      }
      let arrowX = width / 4;
      let arrowY = height * 0.72;

      fill(0, 0, 0, 0.6);
      textSize(60);
      textAlign(CENTER, CENTER);
      text(">", arrowX, arrowY);
    }
  }
}


function drawBubble(visibleTxt, engTxt, x, y, isRightSide, isFinished) {
  if (visibleTxt.length === 0) {
    return;
  }

  let isHovered = false;
  if (isFinished) {
    isHovered = checkHover(x, y, engTxt, isRightSide);
  }

  let displayTxt = visibleTxt;
  if (isHovered) {
    displayTxt = engTxt;
  }

  let txtW = textWidth(displayTxt);

  if (isRightSide) {
    textAlign(RIGHT, CENTER);
    fill("rgb(24 83 145)");
    noStroke();
    rect(x - txtW - 25, y - 40, txtW + 50, 80, 20);
    triangle(x + 25, y + 20, x + 38, y + 42, x + 5, y + 40);

    fill(255);
    text(displayTxt, x, y);
  } else {
    textAlign(LEFT, CENTER);
    fill(255);
    noStroke();
    rect(x - 25, y - 40, txtW + 50, 80, 20);
    triangle(x - 25, y + 20, x - 38, y + 42, x - 5, y + 40);

    fill("rgb(24 83 145)");
    text(displayTxt, x, y);
  }
}

function checkHover(x, y, engTxt, isRightSide) {
  let w = textWidth(engTxt);
  if (isRightSide) {
    return mouseX > x - w - 25 && mouseX < x + 25 && mouseY > y - 40 && mouseY < y + 40;
  } else {
    return mouseX > x - 25 && mouseX < x + w + 25 && mouseY > y - 40 && mouseY < y + 40;
  }
}

// mousedrag for reveal

function mouseDragged() {
  if (currentConvo >= conversations.length && showImage === false) {
    if (sceneImgs.length > 0) {
      let pic = random(sceneImgs);
      dropX.push(mouseX);
      dropY.push(mouseY);
      dropImg.push(pic);
    }

    if (revealCount < dragLeftText.length || revealCount < dragRightText.length) {
      revealCount = revealCount + 1;
    }
  }
}

function nextConvo() {
  index = 0;
  index2 = 0;
  timer = 0;
  showImage = false;
  hasClosedImage = false;

  if (currentConvo < conversations.length) {
    currentConvo = currentConvo + 1;
  }
}

function resetSketch() {
  currentConvo = 0;
  index = 0;
  index2 = 0;
  timer = 0;
  showImage = false;
  hasClosedImage = false;
  revealCount = 0;
  dropX = [];
  dropY = [];
  dropImg = [];
}

function mousePressed() {
  if (showImage) {
    let imgW = width * 0.5;
    let imgH = height * 0.7;
    let closeX = width / 2 + imgW / 2 - 25;
    let closeY = height / 2 - imgH / 2 + 25;

    if (dist(mouseX, mouseY, closeX, closeY) < 40) {
      showImage = false;
      index2 = 1;
      hasClosedImage = true;
    }
  } else {
    if (currentConvo < conversations.length) {
      let convoText = conversations[currentConvo];
      let convoEng = conversationsEnglish[currentConvo];
      let replyText = replies[currentConvo];
      let replyEng = repliesEnglish[currentConvo];
      let isEven = (currentConvo % 2 === 0);

      let x1 = width / 4;
      let x2 = (width * 3) / 4;
      if (isEven === false) {
        x1 = (width * 3) / 4;
        x2 = width / 4;
      }

      let y1 = height / 3;
      let y2 = height / 2;

      // click bubble 1 to load image
      if (index >= convoText.length && checkHover(x1, y1, convoEng, isEven === false)) {
        showImage = true;
        isReplyImage = false;
      }

      if (index2 >= replyText.length && checkHover(x2, y2, replyEng, isEven)) {
        showImage = true;
        isReplyImage = true;
      }

      // click > to go to next scene
      if (index >= convoText.length && index2 >= replyText.length && hasClosedImage) {
        let arrowX = width / 4;
        let arrowY = height * 0.72;
        if (dist(mouseX, mouseY, arrowX, arrowY) < 50) {
          nextConvo();
        }
      }

   } else {
      let arrowX = width / 4;
      let arrowY = height * 0.72;

      if (dist(mouseX, mouseY, arrowX, arrowY) < 50) {
        resetSketch();
      } else {
        // drop photo
        if (sceneImgs.length > 0) {
          let pic = random(sceneImgs);
          dropX.push(mouseX);
          dropY.push(mouseY);
          dropImg.push(pic);
        }
        if (revealCount < dragLeftText.length || revealCount < dragRightText.length) {
          revealCount++;
        }
      }
    }
  }
}

function keyPressed() {
  if (currentConvo < conversations.length) {
    let convoText = conversations[currentConvo];
    let replyText = replies[currentConvo];

    if (index >= convoText.length && index2 >= replyText.length && hasClosedImage) {
      if (key === '>' || key === '.' || keyCode === RIGHT_ARROW) {
        nextConvo();
      }
    }
  } else {
    if (key === '>' || key === '.' || keyCode === RIGHT_ARROW) {
      resetSketch();
    }
  }
}