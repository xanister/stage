
requirejs.config({
    baseUrl: 'js/lib'
});

requirejs(
        ['AnslemClient'],
        function (AnslemClient) {
            AnslemClient.start();
        }
);