'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

import util from '../../components/util/index';
import _ from 'lodash';
import q from 'q';


var ChatSchema = new Schema({
    name: String,
    chatId: String,
    userId: String
});

ChatSchema.statics.create = function (chat) {
    let chatId = util.randomId()
    let chats = _.map(chat.list, userId=> {
        return {
            name: chat.name,
            userId: userId.toString(),
            chatId
        }
    });
    console.log('chats', chats);

    let deferred = q.defer();
    this.collection.insert(chats, function onInsert(err, docs) {
        if (err) {
            console.log('error', err);
            deferred.reject(err);
        } else {
            deferred.resolve();
        }
    });
    return deferred.promise;
};

ChatSchema.statics.getUserChats = function (userId){
    return this.findAsync({userId: userId.toString()})
    .then(chats=>{
            let chatIds = _.map(chats,chat=>chat.chatId)
            return this.findAsync({'chatId':{$in:chatIds}});
        })
    .then(chats=>{
            return _.reduce(chats,(acc,chat)=>{
                let chatId = chat.chatId;
                acc[chatId] = acc[chatId] || {};
                acc[chatId].name = chat.name;
                acc[chatId].chatId = chatId;
                acc[chatId].list = acc[chatId].list || [];
                acc[chatId].list.push(chat.userId);
                return acc;
            },{});
        });
};

ChatSchema.statics.addChatUser = function(chatId, userId){
    return this.findAsync({chatId:chatId})
    .then(chats=>{
            if(!chats || chats.length == 0 || _.find(chats,{userId:userId})) return null;
            else {
                let newChat = new Chat({
                    chatId:chatId.toString(),
                    name:chats[0].name,
                    userId: userId.toString()
                });
                return newChat.saveAsync();
            }
        })
};

ChatSchema.statics.removeChatUser = function(chatId, userId){
    return this.findOneAndRemoveAsync({chatId:chatId.toString(), userId:userId.toString()});
};

export var Chat = mongoose.model('Chat', ChatSchema)
export default Chat
