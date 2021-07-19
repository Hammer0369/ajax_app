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
  });
};
// イベント発火の際に実行する関数を定義するメソッド。定義方法：要素.addEventListener('イベント名', 関数)
window.addEventListener('load', post);