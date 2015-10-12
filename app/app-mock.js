'use strict'

var myAppMock = angular.module('myApp.mock', ['ngMockE2E']);

myAppMock.run(function ($httpBackend) {
  var baseResponse = {
    "totalPages": 1,
    "totalElements": 10,
    "tookInMillis": 42,
    "content": [] };

  var baseDoc = {
    "uuid": "843134383-31226f64-a140-4401-8092-9470b417724",
    "metanode": {
      "owner": "dummy@example.com",
      "documentTitle": "File title",
      "documentName": "filename.ext",
      "documentType": "mime/type",
      "documentAbstract": "Very long long long abstract",
      "nodeType": "DOCUMENT",
      "parent": "x-node-root",
      "tags": ["tag1", "tag2"],
      "creationTime": 1444117878177,
      "lastModificationTime": 1444117878278,
    },
    "lastUpdated": 1444117878278,
    "lastUpdateUser": "DUMMY",
    "created": 1444117878278,
    "createUser": "DUMMY",
    "size": 1234
  };

  $httpBackend.whenGET('documents.json').respond(function (method, url, data) {
    var q = {
      size : 10,
      page : 1,
      limit : 150
    };
    var resp = angular.copy(baseResponse);
    for (var i=0; i<q.size; i++) {
      var doc = angular.copy(baseDoc);
      doc.uuid = doc.uuid+i;
      doc.metanode.documentName = "filename_" + i;
      doc.metanode.documentTitle = "File title " + i;
      resp.content.push(doc);
    }
    return [200, resp, {}];
  });

  $httpBackend.whenGET(/^view/).passThrough();
  $httpBackend.whenGET(/^components\/filesearch/).passThrough();

});
