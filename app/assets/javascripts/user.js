$(function(){    
    $(document).on('turbolinks:load', function(){

        let search_list = $("#user-search-result");

        function addUser(user){
            let html =
                `<div class="chat-group-user clearfix">
                    <input name='group[user_ids][]' type='hidden' value='user_id'>
                    <p class="chat-group-user__name">${user.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                </div>`
            $(search_list).append(html);
        }

        function addNoUser(){
            let html = 
                `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">ユーザーが見つかりません</p>
                </div>`
            $(search_list).append(html);
        }
        function addDeleteUser(name, id) {
            let html = 
                `<div class="chat-group-user clearfix" id="${id}">
                  <p class="chat-group-user__name">${name}</p>
                  <div class="chat-group-user__remove chat-group-user__btn" data-user-id="${id}" data-user-name="${name}">削除</div>
                </div>`;
            $(".js-add-user").append(html);
        }
        function addMember(userId) {
            let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
            $(`#${userId}`).append(html);
        }
    
        $('#user-search-field').on('keyup', function(){
            let input = $("#user-search-field").val();
            $.ajax({
                type: 'GET',
                url: '/users',
                data: { keyword: input},
                dataType: 'json'
            })

            .done(function(users){
                $('#user-search-result').empty();

                if (users.length !== 0){
                  users.forEach(function(user){
                      addUser(user);
                  });
                }
                else {
                    addNoUser();
                }
            })
            .fail(function() {
                alert("ユーザー検索に失敗しました");
            });
        });
    
        $(document).on("click", ".chat-group-user__add", function(){
            const userName = $(this).attr("data-user-name");
            const userId = $(this).attr("data-user-id");
            $(this)
                .parent()
                .remove();
            addDeleteUser(userName, userId);
            addMember(userId);
        })
        $(document).on("click", ".chat-group-user__remove", function() {
            $(this)
                .parent()
                .remove();
        });
    });
});