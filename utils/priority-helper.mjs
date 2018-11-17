let count = function(n, block) {
    let result = '';
    for(let i = 0; i < n; ++i)
        result += block.fn(i);
    return result;
};

export default count;