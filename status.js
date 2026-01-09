
const startTime = new Date('2026-01-17T00:00:00');

function updateUptime() {
    const now = new Date();
    const diff = now - startTime;
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const uptimeString = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

    document.getElementById('uptime').innerText = uptimeString;
}

setInterval(updateUptime, 1000);


const commands = {
    help: "입력 가능한 명령어는 다음과 같습니다 : \n> profile\n> friends\n> status",
    profile: "프로필로 이동 중...",
friends: function() {
    setTimeout(() => {
        outputDiv.innerText += "\n\n친구 목록에 등록된 유저가 없습니다.";
    }, 1500); 
    return "친구 목록 불러오는 중..."; 
},
    status: function() {
    setTimeout(() => {
        outputDiv.innerText += "\n\n기기가 현재 정상적으로 작동 중입니다.";
    }, 1500); 
    return "상태 확인 중..."; 
},
};


const pageLinks = {
    profile: "player_profile.html",
};


const commandInput = document.getElementById("commandInput");
const outputDiv = document.getElementById("output");

commandInput.addEventListener("keydown", async function (e) {
    if (e.key === "Enter") {
        const input = commandInput.value.trim();
        const sanitizedInput = sanitizeInput(input); 

        if (commands[sanitizedInput]) {
            if (typeof commands[sanitizedInput] === "function") {
                outputDiv.innerText = await commands[sanitizedInput]();
            } else {
                outputDiv.innerText = commands[sanitizedInput];
                if (pageLinks[sanitizedInput]) {
                    setTimeout(() => {
                        window.location.href = pageLinks[sanitizedInput];
                    }, 1000);
                }
            }
        } else {
            outputDiv.innerText = `해당 명령어는 존재하지 않음 : " ${sanitizedInput} ". 명령어 목록을 보려면 [ help ] 를 입력하십시오.`;
        }
        commandInput.value = ""; 
    }
});


function sanitizeInput(input) {
    return input.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}
