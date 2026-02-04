var cache;

class CacheBaseModel extends BaseModel {
    fetch() {
        cache = cache || super.fetch();
        return cache.catch(() => cache = null);;
    }
}
