'use strict';

import { Chat}  from './chat.model';
import { User}  from '../user/user.model';
import testDb from '../../test/testDb.js';
import _ from 'lodash';


describe('Chat Model', function () {
    before(function () {
        return Chat.removeAsync();
    });

    beforeEach(function () {
        return testDb.init().then((db)=> {
            expect(!!testDb.user._id).to.be(true);
        })
    });

    afterEach(function () {
        Chat.removeAsync()
        return testDb.reset()
    });

    it('should begin with users', function () {
        var user = testDb.user;
        return User.findAsync({_id: user._id}).should
            .eventually.have.length(1);
    });

    it('should create chat', function (done) {
        var chat = {
            name: 'test',
            list: [testDb.user._id, testDb.otherUser._id]
        };
        return Chat.create(chat)
            .then(()=> {
                return Chat.getUserChats(testDb.user._id);
            })
            .then(chatRecords=> {
                let chatRecord = [];
                _.forIn(chatRecords, (value, key)=> {
                    chatRecord.push(value);
                })
                expect(chatRecord[0].name).to.be('test');
                expect(!!chatRecord[0].chatId).to.be(true);
                expect(chatRecord[0].list.length).to.be(2);
                expect(chatRecord[0].list[0]).to.be(testDb.user._id.toString());

                done()
            });
    });

    it('should add/remove chat user', function (done) {
        var chat = {
            name: 'test',
            list: [testDb.user._id]
        };
        var chatId;
        return Chat.create(chat)
            .then(()=> {
                return Chat.getUserChats(testDb.user._id);
            })
            .then(chatRecords=> {
                let chatRecord = [];
                _.forIn(chatRecords, (value, key)=> {
                    chatRecord.push(value);
                });
                chatId = chatRecord[0].chatId;
                expect(chatRecord[0].list.length).to.be(1);
            })
            .then(()=> {
                return Chat.addChatUser(chatId, testDb.otherUser._id);
            })
            .then(()=>{
                return Chat.getUserChats(testDb.otherUser._id);
            })
            .then(chatRecords=> {
                let chatRecord = [];
                _.forIn(chatRecords, (value, key)=> {
                    chatRecord.push(value);
                });
                expect(chatRecord[0].list.length).to.be(2);
            })
            .then(()=> {
                return Chat.removeChatUser(chatId, testDb.user._id);
            })
            .then(()=>{
                return Chat.getUserChats(testDb.otherUser._id);
            })
            .then(chatRecords=> {
                let chatRecord = [];
                _.forIn(chatRecords, (value, key)=> {
                    chatRecord.push(value);
                });
                expect(chatRecord[0].list.length).to.be(1);

                done();
            })
    });


});
