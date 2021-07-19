class PostsController < ApplicationController

  def index
    @posts = Post.order(id: "DESC")
  end

  # コメントアウトする
  # def new
  # end

  def create
    post = Post.create(content: params[:content]) # 新たに投稿されたメモの内容を変数postに格納している。
    render json:{ post: post } # 定義した変数postの値を、postというキーとセットでデータをJSON形式でJavaScriptに送信してる。
  end

end