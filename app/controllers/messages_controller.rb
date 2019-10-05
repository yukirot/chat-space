class MessagesController < ApplicationController
  def create
    @message = @group.messages.new(message_params)
    if @message.save
      redirect_to group_messages_path(@group), notice: 'メッセージが送信されました！'
    else
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end
end
