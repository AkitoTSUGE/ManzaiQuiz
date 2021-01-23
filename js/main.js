'use strict';

{
const correntQ = document.getElementById('correntQ');
const question = document.getElementById('question');
const choices = document.getElementById('choices');
const btn = document.getElementById('btn');
const result = document.getElementById('result');
const scoreLabel = document.querySelector('#result > p');
 
const quizSet = shuffle([
  
  
  {q: 'でもな、おかんが言うには、最後の晩餐もそれでええって',
  c: ['ほなコンフレークと違うかー', 'コンフレークやないかい！', 'ほな、もーちょっと詳しく教えてくれるー？','精進料理にカタカナのメニューなんてないのよ！']},
  
  {q: 'でもな、おかんが言うには、効いてるか、効いてないかわからへんって',
  c:['湿布やないかい！', 'ほな湿布と違うかー', '昆布やないかい！', 'ほな昆布と違うかー']},
  
  {q: 'こっから明日ー、こっから今日！',
  c:['日付変更線で遊ぶな！', 'リアス式海岸！', '縁起悪すぎるやろ！', '夜行バスのテンション！']},
  
  {q: 'ありがとう味噌汁大臣',
  c:['なんやそのラジオネームみたいなあだ名！', 'キッズダンサーの笑顔！', 'クリオネの泳ぎ方！', 'お前、人殺したんか！']},
  
  {q: 'うるさいキャラ芸人！',
  c:['いや、キャラ芸人になるしかなかった！', '悪くないだろう', '時を戻そう', 'いや休憩は取ろう！']},
  
  {q: '3代目7部丈次郎って人がいてね',
  c:['誰やねんそれ！Jソウルブラザーズみたいな人！', '誰目線でしゃべってるの？', '「を言ってくれてありが」どこいってん？', '文字の出血多量や！']},
  
  {q: '逆の立場になって考えてみて、もし俺が謝ってこられてきてたとしたら、絶対に認められてたと思うか？',
  c:['どう言う意味？', '何言ってるの？', 'もうこの時点で見失ってるんですよ', '全然わからん']},
  
  {q: '俺もう十何年ポイントカード要りません言うてんねんで、今日作ります言うたら店員どう思う？', 
  c: ['なんも思うか！', 'なんでそんなことするん！？', '過去に戻ったからって確実にポイントカード作れるとは限らへんやないか！', 'ポイントカード作った影響で出会わなくなる人おるかもわからへんやないかい！']},
  
  {q: 'あ、来た来た、まなみちゃーん',
  c:['まなみちゃん言う子をやれ言うてるんか？', 'そんなに曲がってないねんて！', 'なんでそんなん言うてまうの？', '思わずよけそうになる距離や！']},

  {q: 'すごく可愛い浴衣。周り見渡しても一番素敵な浴衣。柄も可愛いし最高に綺麗な浴衣',
   c: ['浴衣姿まで言ったほうがいいよ！私は？ってなるから', 'わかってんのかあんた上下迷彩やで！', '探せ探せ指輪が逃げる！', 'もうええわ！']},
  
]);

let currentNum = 0;
let isAnswered;
let score = 0;

function shuffle(arr) {//フィッシャー・イェーツのシャッフルを使って問題の選択肢の順番をシャッフルする
  for (let i = arr.length - 1; i > 0; i--) {//ランダムに選ぶ範囲の終点のインデックスをiという変数にする
    const j = Math.floor(Math.random() * (i + 1));//その範囲の中からランダムに選ぶ要素のインデックスをjという乱数にする。ゼロ番目（先頭）の要素も入れ替えの候補に含まれるため＋１する必要がある。
    [arr[j], arr[i]] = [arr[i], arr[j]];//arrのj番目とi番目の要素を入れ替える。for文の中に入っているのでそれを選択肢の数の分だけ繰り返す
  }
  return arr;
};

function checkAnswer(li) {
  // if (isAnswered === true) {
  if (isAnswered) {//”=== true”は省略可
    return;
  }
  isAnswered = true;
  if (li.textContent === quizSet[currentNum].c[0]) {
    li.classList.add('correct')
    score++;
  } else {
    li.classList.add('wrong')
  }
  btn.classList.remove('disabled');//問題に答えたら、disabledクラスを外して押せる風のデザインにする
}

function setQuiz() {
  isAnswered = false;
  correntQ.textContent = `第${currentNum + 1}問目`;
  question.textContent = quizSet[currentNum].q;

  while(choices.firstChild) {//choicesの最初の子要素が有る限り
    choices.removeChild(choices.firstChild);//choicesの最初の子要素を消す
  }//whileは（）の中に単一のオブジェクトを入れる場合、それがnullやfalseでない限り、{}の中の処理を繰り返すので、choices.firstChildの値がnullになるまでループが回って、choicesの子要素が全てなくなる

  const shuffledChoices = shuffle([...quizSet[currentNum].c]);//（）の中は実引数なのでこれが仮引数であるarrに置き置き換わり、shuffleが実行され、shuffledChoicesに代入される。スプレッド演算子（...）を使うことでquizSetの配列の値のコピーをshuffleに渡し、正誤判定ができるようにしている
  shuffledChoices.forEach(choice => {//一つ一つの要素をchoiceという名前で受け取る。上のc []の中の選択肢の要素が（シャッフルされて）順番に一つずつ入ってくる。
    const li = document.createElement('li');
    li.textContent = choice;
    li.addEventListener('click', () => {
      checkAnswer(li);//引数を渡すことで「clickされたli」を正誤判定して欲しいことをcheckAnswerに伝えている（引数を渡さないとどのliに対して正誤判定をすればいいのかがcheckAnswerに伝わらない）
    });
    choices.appendChild(li);
  });

  if (currentNum === quizSet.length - 1) {
    btn.textContent = 'Show Score';
  }
 }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
  btn.classList.add('disabled');

  if (currentNum === quizSet.length - 1) {
    // console.log(`Score: ${score} / ${quizSet.length}`);
    scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
    result.classList.remove('hidden');
  } else {
    currentNum++;
    setQuiz();
  }
  });
}