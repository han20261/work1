// 获取页面上的关键元素
const ideaInput = document.getElementById('ideaInput');
const addBtn = document.getElementById('addBtn');
const ideaList = document.getElementById('ideaList');
const countSpan = document.getElementById('count');
const clearAllBtn = document.getElementById('clearAll');

// 初始化数据：尝试从浏览器本地存储读取
// 如果之前没存过，就默认为空数组 []
let ideas = JSON.parse(localStorage.getItem('myIdeas')) || [];

// 渲染函数：把数组里的数据画到页面上
function renderIdeas() {
    // 先清空列表，防止重复添加
    ideaList.innerHTML = '';

    // 遍历数组，一条条生成列表项
    ideas.forEach((idea, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${idea.text}</span>
            <button class="delete-btn" onclick="deleteIdea(${index})">删除</button>
        `;
        ideaList.appendChild(li);
    });

    // 更新底部的数量统计
    countSpan.innerText = `当前共有 ${ideas.length} 个灵感`;

    // 【关键步骤】把更新后的数据保存到浏览器本地存储，实现持久化
    localStorage.setItem('myIdeas', JSON.stringify(ideas));
}

// 添加灵感
function addIdea() {
    const text = ideaInput.value.trim(); // 去掉用户输入的前后空格

    if (text === '') {
        alert('请先输入一些内容哦！');
        return;
    }

    // 创建一个新的数据对象
    const newIdea = {
        text: text
    };

    // 把新灵感加到数组的最前面
    ideas.unshift(newIdea);

    // 清空输入框
    ideaInput.value = '';

    // 重新渲染页面
    renderIdeas();
}

// 删除单条灵感 (必须挂在 window 上，HTML 里的 onclick 才能找到它)
window.deleteIdea = function(index) {
    if(confirm('确定要删除这条灵感吗？')) {
        ideas.splice(index, 1); // 从数组中移除
        renderIdeas(); // 重新渲染
    }
}

// 清空所有
clearAllBtn.addEventListener('click', () => {
    if(confirm('确定要清空所有灵感吗？此操作不可恢复。')) {
        ideas = [];
        renderIdeas();
    }
});

// 绑定“添加”按钮的点击事件
addBtn.addEventListener('click', addIdea);

// 绑定回车键快捷添加
ideaInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addIdea();
    }
});

// 页面加载完毕后，立即执行一次渲染，把之前的数据展示出来
renderIdeas();