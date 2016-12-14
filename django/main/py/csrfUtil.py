from django.middleware.csrf import CsrfViewMiddleware
debug = False

def process_token(request):
    #process_http_parameters(request.POST)
    body = request.body
    reason = CsrfViewMiddleware().process_view(request, None, (), {})
    if reason:
        if debug:
            print ("csrfUtil.process_token: CRSF Check Failed")
        raise PermissionException()
    else:
        if debug:
            print ("csrfUtil.process_token: CRSF Check Succeeded")
        return body