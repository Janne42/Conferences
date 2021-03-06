
function add_paths(entries, f = null) {
    const a = []
    entries.forEach((entry) => {
        if (entry) {
            const c_path = '/conf/' + entry.conf_id
            let new_obj = Object.assign(entry, { c_path })
            if (entry.instance_id) {
                const ci_path = c_path + '/instance/' + entry.instance_id
                new_obj.ci_path = ci_path
                if (entry.track_id) {
                    const track_path = ci_path + '/track/' + entry.track_id
                    new_obj.track_path = track_path
                    if (entry.submission_id)
                        new_obj.submission_path = track_path + '/submission/' + entry.submission_id
                }
            }
            if (f)
                new_obj = Object.assign(new_obj, f(new_obj))
            a.push(new_obj)
        }
    })
    return a
}

function require_user(req, res, next, return_path) {
    console.log('require_user, user is', req.user)
    if (!req.user) {
        return res.redirect(return_path)
    }
    next()
}

function require_admin(req, res, next, return_path) {
    console.log('require_admin, user is', req.user)
    if (!req.user || !req.user.is_admin) {
        return res.redirect(return_path)
    }
    next()
}

function string_sort(values, field = 'when') {
    return values.sort((a, b) => { return ('' + a[field]).localeCompare('' + b[field]) })
}

module.exports = {
    add_paths,
    require_user,
    require_admin,
    string_sort,
}
