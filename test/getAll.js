import axios from 'axios';
import * as assert from 'assert';

const path = 'http://localhost:3000/ingredient/';

describe('Test the GET ingredients from /ingredient', function () {
    it('An UserID must be passed in body', function () {
        axios({ method: 'get', url: path, data: { userId: 4 } })
            .then((res) => {
                assert.strictEqual(res.status, 202);
            })
            .catch((res) => {
                //Does handle 404
                assert.strictEqual(res.status, 404);
            });
    });
});
