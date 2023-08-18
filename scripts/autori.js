const firstInfo = document.getElementById("first");
const secondInfo = document.getElementById("second");
const firstH2 = firstInfo.getElementsByTagName("h2")[0];
const secondH2 = secondInfo.getElementsByTagName("h2")[0];
const firstBio = document.getElementById("firstBio");
const secondBio = document.getElementById("secondBio");

function hoverImg(value) {
    if (value == 0) {
        firstInfo.style.width = "0";
        firstH2.style.display = "none";
        setTimeout(function () {
            firstBio.style.display = "block";
        }, 700);
    }
    else if (value == 1) {
        secondInfo.style.width = "0";
        secondH2.style.display = "none";
        setTimeout(function () {
            secondBio.style.display = "block";
        }, 700);
    }
}
function leaveImg(value) {
    setTimeout(function () {
        if (value == 0) {
            firstBio.style.display = "none";
            firstInfo.style.width = "70%";
            setTimeout(function () {
                firstH2.style.display = ""
            }, 300);
        }
        else if (value == 1) {
            secondBio.style.display = "none";
            secondInfo.style.width = "70%";
            setTimeout(function () {
                secondH2.style.display = ""
            }, 300);
        }
    }, 700);
}