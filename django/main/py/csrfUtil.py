from django.middleware.csrf import CsrfViewMiddleware

def process_token(request):
    #process_http_parameters(request.POST)
    body = request.body
    reason = CsrfViewMiddleware().process_view(request, None, (), {})
    if reason:
        print ("csrfUtil.process_token: CRSF Check Failed")
        raise PermissionException()
    else:
        print ("csrfUtil.process_token: CRSF Check Succeeded")
        return body