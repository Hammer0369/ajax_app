const buildHTML = (XHR) => { // 投稿したメモのHTMLを生成する部分を関数buildHTMLとして、外に切り出している。
const item = XHR.response.post; // XHR.response.postの記述により、レスポンスの中から投稿されたメモの情報を抽出→変数itemに格納している。XHR.response.postで値が取れるのは、postsコントローラーのcreateアクションにrender json: {post: post}と記述されていることで、postというキーと投稿されたメモの内容が紐付いているから.
// item内に格納されたメモの情報を元にして、ブラウザに描画するためのHTMLを生成し、変数htmlに格納している。
const html = `
  <div class="post">
    <div class="post-date">
      投稿日時：${item.created_at}
    </div>
    <div class="post-content">
      ${item.content}
    </div>
  </div>`;
  return html; // 関数buildHTMLの返り値にhtmlを指定している。
};

function post (){
  const submit = document.getElementById("submit"); // getElementByIdメソッドで取得した投稿ボタンの要素を変数submitに格納してい
  submit.addEventListener("click", (e) => { // eはイベントオブジェクトという、イベント発生時の情報を持ったオブジェクト。
    e.preventDefault(); // 投稿ボタンのクリックを無効化している。
    const form = document.getElementById("form"); // フォームの要素を取得し、変数formに格納している。
    const formData = new FormData(form); // 新たに生成したFormDataオブジェクトを変数formDataに格納している。
    const XHR = new XMLHttpRequest(); // 新たに生成したXMLHttpRequestオブジェクトを変数XHRに格納している。
    XHR.open("POST", "/posts", true); // 非同期で投稿したメモをデータベースに保存するリクエストを指定。
    XHR.responseType = "json"; // サーバーからのレスポンスの形式をJSONに指定。
    XHR.send(formData); // フォームに入力された内容をサーバー側に送信。
    XHR.onload = () => { // リクエストの送信に成功したときに行う処理を定義。
      if (XHR.status != 200) { // HTTPステータスコードが格納されており、リクエストが失敗した場合に処理される条件を定義
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null; // エラーが出た場合に、以降の行に記述されている処理を行わないようにしている。
      };
      const list = document.getElementById("list"); // 新しいメモを挿入するための要素を取得して、変数listに格納している。
      const formText = document.getElementById("content"); // 入力フォームにテキストが残ったままなので、リセットの対象となるフォームの要素contentを取得して、変数formTextに格納している。
      list.insertAdjacentHTML("afterend", buildHTML(XHR)); // insertAdjacentHTMLメソッドの第一引数にafterendを指定することで、変数listに格納された要素の直後に生成したHTMLを挿入している。
      formText.value = ""; // 変数formTextのvalue属性に空の文字列を指定することで、フォームの中身をリセットしている。
    };
  });
};
// イベント発火の際に実行する関数を定義するメソッド。定義方法：要素.addEventListener('イベント名', 関数)
window.addEventListener('load', post);