import React from 'react';
import {SearchCollection} from '../src';

const sermonData = [
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "00c33f16-1d28-4681-a294-550e4eb13432",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2018-09-23.mp3",
    "passage": "John 19",
    "preachedDate": "2018-09-23",
    "series": {
      "_ref": "d2a7be4c-9364-4f5f-9855-d69aa5e0dd35",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "mission-month-week-4"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "Mission Month Week 4"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "00f5df34-e40b-451c-b2ee-9d49d392d371",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2014.09.28%20Revelation%2013.mp3",
    "passage": "Revelation 13",
    "preachedDate": "2014-09-28",
    "series": {
      "_ref": "53d6425b-6d6e-437e-a9cc-04a13debf655",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "caught-up-in-a-conflict-1"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "Caught up in a Conflict"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "01b8f816-703d-490f-8f71-ae4d7afc489b",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2013.12.08%20Luke%2010.38-42.mp3",
    "passage": "Luke 10:38-42",
    "preachedDate": "2013-12-08",
    "series": {
      "_ref": "cbff9b2c-3e8e-415c-9024-d80ebf9bbcb7",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "peace-in-your-life"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "Peace in Your life"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "0201887b-d45c-441f-bd96-e52fdaac5f00",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2016-07-31%20John%201.1-14.mp3",
    "passage": "John 1:1-14",
    "preachedDate": "2016-07-31",
    "series": {
      "_ref": "9ec9a85d-2dd3-4efd-9901-d9b43b196cb4",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "the-bible-1"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "The Bible"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "0218539b-4f9c-46fe-b46e-2d723755754f",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2014.08.31%20Revelation%209.mp3",
    "passage": "Revelation 9",
    "preachedDate": "2014-08-31",
    "series": {
      "_ref": "9ec9a85d-2dd3-4efd-9901-d9b43b196cb4",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "the-truth-about-hell"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "The Truth about Hell"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "02fdb1f8-45be-4c8c-b196-f6d2fe0c2251",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "wwf-R-Jones.mp3",
    "series": {
      "_ref": "c7bf390e-9ec6-499c-b8da-ef56200e272f",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "promises-of-god-3"
    },
    "speaker": {
      "_ref": "90801e3c-cb39-4acc-82bd-ab27cb6c6322",
      "_type": "reference"
    },
    "title": "Promises of God 3"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "03222e37-6a3e-496d-b026-8f795cd0a1bb",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2010.08.01%20-%201%20Samuel%2014.mp3",
    "passage": "1 Samuel 14",
    "preachedDate": "2010-09-01",
    "series": {
      "_ref": "905de157-a03a-4d6a-85b5-95871ecefbfe",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "1-samuel-14"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "1 Samuel 14"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "0427c6a7-4c6e-4197-8f4b-16a35659fdc1",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "01%20Christine%20Jolly%20-%20Sermon.mp3",
    "preachedDate": "2011-08-27",
    "series": {
      "_ref": "fb3bc421-663d-439a-8bed-2cd7d6888d81",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "christine-jolly-sermon"
    },
    "speaker": {
      "_ref": "deaec8e6-09b8-40f1-bcd8-8e69b6533a79",
      "_type": "reference"
    },
    "title": "Christine Jolly - Sermon"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "043d4062-730e-4684-a80f-365a90bde475",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2019%20-%2011%20-%2017.mp3",
    "passage": "Matthew 9:1-17",
    "preachedDate": "2019-11-17",
    "series": {
      "_ref": "c38949e7-076f-418c-9212-42d87bc5956e",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "matthew-9:1-17"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "Matthew 9:1-17"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "0492e0f6-2b07-4f18-a82b-9cb72a3b2654",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2016-10-16%20-%20Psalm%20119%20169-176.mp3",
    "passage": "Psalm 119: 169-176",
    "preachedDate": "2016-10-16",
    "series": {
      "_ref": "8e84d424-4be4-489b-b314-41391842af59",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "a-wise,-mature-and-godly-life"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "A wise, Mature and Godly Life"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "05e1aa4d-51bf-4cc4-bcf3-ad6ea7db4ec0",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2013.04.28%20John%209%201-39.mp3",
    "passage": "John 9:1-39",
    "preachedDate": "2013-04-28",
    "series": {
      "_ref": "40f744d5-285d-45d1-be7c-77bede3cda6b",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "john-9:1-39"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "John 9:1-39"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "06386cee-9687-47e3-951e-d375bd4b7038",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2011.09.04%20-%201%20Timothy%201.mp3",
    "preachedDate": "2011-09-04",
    "series": {
      "_ref": "3b6b8db0-cc33-4962-878f-1dfca40dd5c4",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "1"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "1"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "06dde77d-9bdf-40b9-9096-985fa00ba7ff",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2013.06.16.mp3",
    "passage": "Acts 1:1 - 11",
    "preachedDate": "2013-06-16",
    "series": {
      "_ref": "78e2b331-09be-4fa1-b693-74531eddbc32",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "acts-1:1-11"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "Acts 1:1 - 11"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "071eebd7-2b23-411f-8f3f-5c08c21bb952",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2014.06.29%202%20Samuel%204.mp3",
    "passage": "2 Samuel 4",
    "preachedDate": "2014-06-29",
    "series": {
      "_ref": "2a4d8d5e-bbc1-42fb-aa6f-2a8efe5c1068",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "the-secret-to-the-christian-life"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "The Secret to the Christian Life"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "07437662-2c72-434f-b0e5-63d1ad2fc04b",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2016-08-14.mp3",
    "passage": "1 Corinthians 7",
    "preachedDate": "2016-08-14",
    "series": {
      "_ref": "d33e81a7-e146-4836-8a82-ac82373bb14b",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "marriage-in-a-changing-society:-singleness"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "Marriage in a changing society: Singleness"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "0759cac3-5a38-4fd9-85ba-c1ccacc2c84d",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2017-07-23_0.mp3",
    "preachedDate": "2017-07-23",
    "series": {
      "_ref": "9ec9a85d-2dd3-4efd-9901-d9b43b196cb4",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "joseph"
    },
    "speaker": {
      "_ref": "ec20dc91-94e2-4b36-b327-9a246b8dc6b6",
      "_type": "reference"
    },
    "title": "Joseph"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "07b6d39f-96e9-4b76-876a-d4f442addbc8",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2010.11.28%20-%201Thessalonians%201.1-10.mp3",
    "passage": "1 Thessalonians",
    "preachedDate": "2010-11-28",
    "series": {
      "_ref": "6dacb10d-d2b0-48d3-9b34-705d4670df1b",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "1-thessalonians"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "1 Thessalonians"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "089bae3c-32e8-4abd-b3ac-1045aaacb0fd",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2011.06.05%20-%20Judgementalism%20%26%20the%20Law.mp3",
    "preachedDate": "2011-06-05",
    "series": {
      "_ref": "254e6128-cab1-478f-a40f-1c95f8e10788",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "judgementalism-and-the-law"
    },
    "speaker": {
      "_ref": "0a115e15-1c38-4806-9bb3-6b22192e95db",
      "_type": "reference"
    },
    "title": "Judgementalism and the Law"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "09149cc9-b8d8-4dd6-b67a-b272ab3a36b4",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2017-07-16%20Genesis%2011%2028%20-%2012%209.mp3",
    "passage": "Genesis 11:28 - 12:9",
    "preachedDate": "2017-07-16",
    "series": {
      "_ref": "9ec9a85d-2dd3-4efd-9901-d9b43b196cb4",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "abraham-the-promise"
    },
    "speaker": {
      "_ref": "ec20dc91-94e2-4b36-b327-9a246b8dc6b6",
      "_type": "reference"
    },
    "title": "Abraham - The Promise"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "0a59f7c1-57ac-44b5-9b7d-5c0da0446990",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2017-12-10%20d%20sHEP.mp3",
    "passage": "John",
    "preachedDate": "2017-12-10",
    "series": {
      "_ref": "0c5965c9-fd49-4040-891b-51d8924925c9",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "john"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "John"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "0b1ddf5a-c302-4607-a66a-c3aea80cb8b7",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "19-05-12.mp3",
    "passage": "2 Samuel 14",
    "preachedDate": "2019-05-12",
    "series": {
      "_ref": "af373852-7afb-4d5b-9256-b29090dc07ac",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "2-samuel-14"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "2 Samuel 14"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "0d0bd5f5-1ebc-4ebc-a714-6bdbd46b11cd",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2013.11.10%20Psalm%20119.41-48.mp3",
    "passage": "Psalm 119 41-48",
    "preachedDate": "2013-11-10",
    "series": {
      "_ref": "8e84d424-4be4-489b-b314-41391842af59",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "fall-in-love-with-the-life-giving-word"
    },
    "speaker": {
      "_ref": "0a115e15-1c38-4806-9bb3-6b22192e95db",
      "_type": "reference"
    },
    "title": "Fall in Love with the Life Giving Word"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "0d3cea69-1bae-4344-99ce-2d90710d82b1",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2014.01.12%20Ecclesiastes%203_0.mp3",
    "passage": "Ecclesiastes 3",
    "preachedDate": "2014-01-12",
    "series": {
      "_ref": "4673e58a-9486-4e7d-a216-52025290e357",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "the-tyranny-of-time"
    },
    "speaker": {
      "_ref": "40f95aaa-a845-42d9-b839-b712895717c9",
      "_type": "reference"
    },
    "title": "The Tyranny of Time"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "0d40e2c0-ca73-4cbb-94e4-46a19c8cd8cf",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2017-04-14%20-%20Mark%208.22-30.mp3",
    "passage": "Mark 8.22-30",
    "preachedDate": "2017-04-14",
    "series": {
      "_ref": "d32c634c-7c65-4b05-980f-bf49a05ae43d",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "what-makes-good-friday-good?"
    },
    "speaker": {
      "_ref": "5335d437-809b-4fc0-bb84-b0ccfc148634",
      "_type": "reference"
    },
    "title": "What makes Good Friday good?"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "0d8cc715-d5e8-434d-9f4d-0c3b2163593a",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2014.11.9%20Psalm%20119.65-72.mp3",
    "passage": "Psalm 119:65-72",
    "preachedDate": "2014-11-09",
    "series": {
      "_ref": "8e84d424-4be4-489b-b314-41391842af59",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "god's-word-will-be-good-for-you-(new)"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "God's word will be good for you (new)"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "0dd52629-c6ef-450f-a20e-68a1eb175764",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2012.12.02%20Luke%2019%201-10.mp3",
    "passage": "Luke 19: 1-10",
    "preachedDate": "2012-12-02",
    "series": {
      "_ref": "867aa942-de7e-4686-b405-9bcd39cc04a3",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "luke-19:-1-10"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "Luke 19: 1-10"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "0e184d36-0cee-49a6-93b0-878b11a2774b",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2018-05-13.mp3",
    "passage": "2 Samuel 12:1-14",
    "preachedDate": "2018-05-13",
    "series": {
      "_ref": "af373852-7afb-4d5b-9256-b29090dc07ac",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "2-samuel-12:1-14"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "2 Samuel 12:1-14"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "0e4d75bb-0237-4ac8-bdee-12a232fe8aa6",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2016-07-17%20Matthew%2020.20-34.mp3",
    "passage": "Matthew 20:20-34",
    "preachedDate": "2016-07-17",
    "series": {
      "_ref": "9ec9a85d-2dd3-4efd-9901-d9b43b196cb4",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "i-want-to-break-free"
    },
    "speaker": {
      "_ref": "df9185b2-23be-4431-872f-80523a6da9e7",
      "_type": "reference"
    },
    "title": "I Want To Break Free"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "0f6a01a4-d348-440f-9241-26a8e6446104",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2014.03.30%20Romans%203.1-8.mp3",
    "passage": "Romans 3:1-8",
    "preachedDate": "2014-03-30",
    "series": {
      "_ref": "1195c2ac-64c3-453f-aeb5-0bca346f4a08",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "let-the-gospel-stand"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "Let the Gospel Stand"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "0fc161e3-456b-44f4-834f-f54734705fa7",
    "_rev": "n6mjcFCpUUOrwx9jSNdJBa",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:28Z",
    "file": "2013.05.05%201%20Samuel%2024.mp3",
    "passage": "1 Samuel 24",
    "preachedDate": "2013-05-05",
    "series": {
      "_ref": "905de157-a03a-4d6a-85b5-95871ecefbfe",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "1-samuel-24-1"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "1 Samuel 24"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "113a6b00-1b71-4adc-8ffd-b5619e2a0b47",
    "_rev": "TLrSzDQ4R7AMFIwKBrEisq",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:29Z",
    "file": "30.09.2012%20-%20Song%20of%20Song%203.6-4.16.mp3",
    "passage": "Song of Songs 3:6-4:16",
    "preachedDate": "2012-09-30",
    "series": {
      "_ref": "fd1685e1-0953-46d0-b061-7020ade44a20",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "song-of-songs-3:6-4:16"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "Song of Songs 3:6-4:16"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "11e514ef-c85a-475b-ba30-01ffd1a74f36",
    "_rev": "TLrSzDQ4R7AMFIwKBrEisq",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:29Z",
    "file": "2017-11-05%20Dan%20Shepheard.mp3",
    "passage": "John",
    "preachedDate": "2017-11-05",
    "series": {
      "_ref": "0c5965c9-fd49-4040-891b-51d8924925c9",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "johns-gospel"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "Johns Gospel"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "11ee758d-1f94-43df-bcd4-9ca371c987f1",
    "_rev": "TLrSzDQ4R7AMFIwKBrEisq",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:29Z",
    "file": "2015.02.15%20Romans%206%201-14_0.mp3",
    "passage": "Romans 6: 1-14",
    "preachedDate": "2015-02-15",
    "series": {
      "_ref": "1195c2ac-64c3-453f-aeb5-0bca346f4a08",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "god-at-work-in-you"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "God at Work in You"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "12d40725-a65c-4305-b7ab-1e51436f9ebc",
    "_rev": "TLrSzDQ4R7AMFIwKBrEisq",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:29Z",
    "file": "2011.06.28%20-%20Forgiveness.mp3",
    "preachedDate": "2011-06-28",
    "series": {
      "_ref": "9bf32e9e-00a5-4f81-9a0e-74e49d366b48",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "forgiveness-1"
    },
    "speaker": {
      "_ref": "5305597f-b0fc-45cb-b6c2-a9526415d1d0",
      "_type": "reference"
    },
    "title": "Forgiveness"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "13312e53-086b-4d55-8eb7-ff0adbc69bd3",
    "_rev": "TLrSzDQ4R7AMFIwKBrEisq",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:29Z",
    "file": "2012.04.29%20-%20The%20Trinity%203.mp3",
    "preachedDate": "2012-04-29",
    "series": {
      "_ref": "2e014409-e9b8-4f13-8ea1-deef2876ce45",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "god,-the-spirit"
    },
    "speaker": {
      "_ref": "0a115e15-1c38-4806-9bb3-6b22192e95db",
      "_type": "reference"
    },
    "title": "God, The Spirit"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "1365699c-0bf7-4f11-b16a-0a3ef2b9a357",
    "_rev": "TLrSzDQ4R7AMFIwKBrEisq",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:29Z",
    "file": "2018-01-14%20Luke%207%2036-50_0.mp3",
    "passage": "Luke 7:36-50",
    "preachedDate": "2018-01-14",
    "series": {
      "_ref": "9ec9a85d-2dd3-4efd-9901-d9b43b196cb4",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "new-beginnings-1"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "New Beginnings"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "13842e01-65fa-436f-93f1-d5ff14781cee",
    "_rev": "TLrSzDQ4R7AMFIwKBrEisq",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:29Z",
    "file": "2014.02.16%20Romans%201.16-17.mp3",
    "passage": "Romans 1:16-17",
    "preachedDate": "2014-02-16",
    "series": {
      "_ref": "1195c2ac-64c3-453f-aeb5-0bca346f4a08",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "understand-the-power-of-the-gospel"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "Understand the Power of the Gospel"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "13e97167-9b80-41a2-a1e4-6bdbf1acec92",
    "_rev": "TLrSzDQ4R7AMFIwKBrEisq",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:29Z",
    "file": "2012.07.22%20-%202%20Timothy%202.11-14.mp3",
    "passage": "2 Timothy 2:11-14",
    "preachedDate": "2012-07-22",
    "series": {
      "_ref": "7c538b3f-f8f6-4d64-a226-b52f409ad791",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "2-timothy-2:11-14"
    },
    "speaker": {
      "_ref": "997f5225-b9cc-4362-9d11-80fac425e088",
      "_type": "reference"
    },
    "title": "2 Timothy 2:11-14"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "148f6c4b-2713-4679-883e-6f83926d58b6",
    "_rev": "TLrSzDQ4R7AMFIwKBrEisq",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:29Z",
    "file": "2019%20-%2011%20-%2010.mp3",
    "passage": "Matthew 8:28-34",
    "preachedDate": "2019-11-10",
    "series": {
      "_ref": "c38949e7-076f-418c-9212-42d87bc5956e",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "matthew-8:28-34"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "Matthew 8:28-34"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "15014c1c-a5bc-437b-92c6-0ba2d143ab24",
    "_rev": "TLrSzDQ4R7AMFIwKBrEisq",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:29Z",
    "file": "2015.09.06%20Psalm%20119.105-112.mp3",
    "passage": "Psalm 119:105-112",
    "preachedDate": "2015-09-06",
    "series": {
      "_ref": "8e84d424-4be4-489b-b314-41391842af59",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "psalm-119:105-112"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "Psalm 119:105-112"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "15403ce9-e879-49c6-af89-09f591054cbd",
    "_rev": "TLrSzDQ4R7AMFIwKBrEisq",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:29Z",
    "file": "2011.04.04%20-%20The%20End%20Already.mp3",
    "preachedDate": "2011-04-04",
    "series": {
      "_ref": "3da5a31d-d8e0-447c-881e-93c6c81709ff",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "the-end-already"
    },
    "speaker": {
      "_ref": "40f95aaa-a845-42d9-b839-b712895717c9",
      "_type": "reference"
    },
    "title": "The End Already"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "15789b87-6ee6-47dc-884c-9354ea0b75b9",
    "_rev": "TLrSzDQ4R7AMFIwKBrEisq",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:29Z",
    "file": "2014.03.09%20Romans%202.17-29.mp3",
    "passage": "Romans 2:17-29",
    "preachedDate": "2014-03-09",
    "series": {
      "_ref": "1195c2ac-64c3-453f-aeb5-0bca346f4a08",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "christianity-is-unique"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "Christianity is Unique"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "1656dc09-5bef-4e18-8b92-038b7b9869b8",
    "_rev": "TLrSzDQ4R7AMFIwKBrEisq",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:29Z",
    "file": "dansermonEaster20190421.mp3",
    "passage": "Luke 24:36-49",
    "preachedDate": "2019-04-21",
    "series": {
      "_ref": "b78581f3-5359-4d8e-a7fc-426d0d1598a5",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "easter-sermon-2019"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "Easter Sermon 2019"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "16891fb2-03da-4a4d-a161-f11e7952d6de",
    "_rev": "TLrSzDQ4R7AMFIwKBrEisq",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:29Z",
    "file": "2017-04-09.mp3",
    "passage": "Mark 11:12-25",
    "preachedDate": "2017-04-09",
    "series": {
      "_ref": "ec7b8240-569b-4424-af2e-e4a749ac5f8a",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "mark-11:12-25"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "Mark 11:12-25"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "183f1bd3-1973-45aa-aa65-fff25df616be",
    "_rev": "TLrSzDQ4R7AMFIwKBrEisq",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:29Z",
    "file": "2018-04-22%20Acts%2017.16-34.mp3",
    "passage": "Acts 17:16-34",
    "preachedDate": "2018-04-22",
    "series": {
      "_ref": "9ec9a85d-2dd3-4efd-9901-d9b43b196cb4",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "creation-embracing"
    },
    "speaker": {
      "_ref": "5335d437-809b-4fc0-bb84-b0ccfc148634",
      "_type": "reference"
    },
    "title": "Creation Embracing"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "1864298c-d299-4817-8ccf-386cf70dd901",
    "_rev": "TLrSzDQ4R7AMFIwKBrEisq",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:29Z",
    "file": "2016.02.07%20Romans%209%201-29.mp3",
    "passage": "Romans 9:1-29",
    "preachedDate": "2016-02-07",
    "series": {
      "_ref": "1195c2ac-64c3-453f-aeb5-0bca346f4a08",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "god's-saving-mercy-1"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "God's Saving Mercy"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "187d8011-e5af-4861-9ec9-61d84a0d3f3a",
    "_rev": "TLrSzDQ4R7AMFIwKBrEisq",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:29Z",
    "file": "2014.02.02%201%20Corinthians%2015%2012-33_0.mp3",
    "passage": "1 Corinthians 15:12-33",
    "preachedDate": "2014-02-02",
    "series": {
      "_ref": "9ec9a85d-2dd3-4efd-9901-d9b43b196cb4",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "the-shape-and-certainty-of-our-hope"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "The Shape and Certainty of our Hope"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "18b97278-df77-465b-8fee-e78e0dca879f",
    "_rev": "TLrSzDQ4R7AMFIwKBrEisq",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:29Z",
    "file": "2012.05.04%20-%20We%20Believe%201.mp3",
    "preachedDate": "2012-05-04",
    "series": {
      "_ref": "dc3a5df8-bd7a-4a4b-8262-6557a5680b42",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "sermon-1"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "Sermon 1"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "19972658-19ef-49bd-ac85-3c733a96ed02",
    "_rev": "TLrSzDQ4R7AMFIwKBrEisq",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:29Z",
    "file": "2010.07.11%20-%201%20Samuel%209-10.mp3",
    "passage": "1 Samuel 9-10",
    "preachedDate": "2010-07-11",
    "series": {
      "_ref": "905de157-a03a-4d6a-85b5-95871ecefbfe",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "1-samuel-9-10"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "1 Samuel 9-10"
  },
  {
    "_createdAt": "2020-03-20T01:13:11Z",
    "_id": "19ee874c-1ab0-4d15-be27-e2673aa96eb8",
    "_rev": "TLrSzDQ4R7AMFIwKBrEisq",
    "_type": "sermon",
    "_updatedAt": "2020-03-20T02:17:29Z",
    "file": "2011.07.17%20-%201%20Samuel%2016.1-13.mp3",
    "passage": "1 Samuel 16:1-13",
    "preachedDate": "2011-07-17",
    "series": {
      "_ref": "905de157-a03a-4d6a-85b5-95871ecefbfe",
      "_type": "reference"
    },
    "slug": {
      "_type": "slug",
      "current": "1-samuel-16:1-13"
    },
    "speaker": {
      "_ref": "6b313f8b-98cc-4ee9-9333-45397e87f105",
      "_type": "reference"
    },
    "title": "1 Samuel 16:1-13"
  }
];

const headers = [
  {heading: 'Title', key: 'title', searchable: true},
  {heading: 'Series', key: 'series', searchable: true},
  {heading: 'Source', key: 'book', searchable: true},
  {heading: 'Speaker', key: 'preacher', searchable: true},
  {heading: 'Date delivered', key: 'date', searchable: false}
];

export default (
  <SearchCollection
    fields={headers}
    dataCollection={sermonData}
    setSubset={() => {}}
    labels={{searchbox: 'Filter talks:', checkbox: 'use inclusive mode'}}
  />
);
