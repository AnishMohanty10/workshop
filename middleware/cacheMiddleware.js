const cache = new Map();
const TTL = 60 * 1000; 

function cacheMiddleware(req, res, next) {
    if (req.method !== 'GET') return next();

    const key = req.originalUrl;
    const cachedEntry = cache.get(key);

    if (cachedEntry) {
        const age = Date.now() - cachedEntry.timestamp;
        
        if (age < TTL) {
            // Cache is valid
            res.set('X-Cache', 'HIT');
            return res.json(cachedEntry.data);
        } else {
            // Cache expired, remove stale data
            cache.delete(key);
        }
    }


    res.set('X-Cache', 'MISS');
    const originalJson = res.json;
    
    res.json = function (body) {
        cache.set(key, {
            data: body,
            timestamp: Date.now()
        });
        originalJson.call(this, body);
    };

    next();
}

function invalidateCache(req, res, next) {

    res.on('finish', () => {

        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache.clear();
        }
    });
    next();
}

module.exports = { cacheMiddleware, invalidateCache };