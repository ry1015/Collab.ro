from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from main import views
from main.projects import projects
from main.user_tracks import user_tracks
from main.track_comments import track_comments
from main.stems import stems 
from main.search import search
from main.tracks import tracks
urlpatterns = [
    url(r'^$', views.index),
    url(r'^api/login$',views.login),
    url(r'^index', views.index),
    url(r'^signup', views.signup),
    url(r'^api/signup', views.signup_user),
    url(r'^api/update-profile', views.update_profile),
    url(r'^api/delete-social-network', views.delete_social_network),
    url(r'^api/add-social-network', views.add_social_network),
    url(r'^api/get-tracks', user_tracks.get_user_tracks),
    url(r'^api/get-track-comments', track_comments.get_track_comments),
    url(r'^api/post-track-comment', track_comments.post_track_comment),
    url(r'^api/post-reply-comment', track_comments.post_reply),
    url(r'^api/add_project', projects.add_project),
    url(r'^api/get_projects', projects.get_projects),
    url(r'^api/delete_project', projects.delete_project),
    url(r'^api/get-search-results', search.get_user_input_results),
    url(r'^api/session', views.session),
    url(r'^api/logout', views.logout),
	url(r'^api/upload_stem', stems.upload_stem),
    url(r'^api/upload_track', tracks.upload_track),
    # url(r'^api/userprofiles/$', views.userprofile_list),
    # url(r'^api/userprofile/(?P<pk>[0-9]+)/$', views.userprofile_detail),
    # url(r'^api/userprofiles$', user.userprofile_list),
    # url(r'^api/userprofiles/(?P<pk>[0-9]+)$', user.userprofile_detail),
    # url(r'^api/providerprofiles$', provider.providerprofile_list),
    # url(r'^api/providerprofiles/images$', provider.providerprofile_image_list),
    # url(r'^api/providerprofiles/(?P<pk>[0-9]+)$', provider.user_providerprofile_list),
    # url(r'^api/providerprofiles/(?P<pk>[0-9]+)/(?P<providerprofile_number>[0-9]+)$', provider.user_providerprofile_detail),
    # url(r'^api/jobs$', job.jobs_list),
    # url(r'^api/jobs/current$', job.current_jobs_list),
    # url(r'^api/jobs/applications$', application.application_list),
    # url(r'^api/jobs/applications/(?P<application_number>[0-9]+)$', application.application_detail),
    # url(r'^api/jobs/applications/(?P<application_number>[0-9]+)/accepted$', application.application_accepted),
    # url(r'^api/jobs/applications/(?P<application_number>[0-9]+)/chosen$', application.application_chosen),
    # url(r'^api/jobs/applications/(?P<application_number>[0-9]+)/declined$', application.application_declined),
    # url(r'^api/jobs/(?P<job_number>[0-9]+)/applicants$', application.job_applicant_list),
    # url(r'^api/jobs/(?P<pk>[0-9]+)$', job.user_jobs_list),
    # url(r'^api/jobs/(?P<pk>[0-9]+)/current$', job.user_current_jobs_list),
    # url(r'^api/jobs/(?P<pk>[0-9]+)/previous$', job.user_previous_jobs_list),
    # url(r'^api/jobs/(?P<pk>[0-9]+)/(?P<job_number>[0-9]+)$', job.user_job_detail),
    # url(r'^api/jobs/categories$', job.categories_list),
    # url(r'^api/jobs/contracts$', job.contract_list),
    # url(r'^api/jobs/contracts/(?P<contract_number>[0-9]+)$', job.contract_detail),
    # url(r'^api/jobs/contracts/poster/(?P<pk>[0-9]+)$', job.poster_contracts),
    # url(r'^api/jobs/contracts/applicant/(?P<pk>[0-9]+)$', job.applicant_contracts),
    # url(r'^api/jobs/contracts/poster/(?P<pk>[0-9]+)/previous$', job.poster_previous_contracts),
    # url(r'^api/jobs/contracts/applicant/(?P<pk>[0-9]+)/previous$', job.applicant_previous_contracts),
    # url(r'^api/jobs/payments$', payment.payment_list),
    # url(r'^api/jobs/payments/(?P<payment_number>[0-9]+)$', payment.payment_detail),
    # url(r'^api/userprofiles/preferences$', views.preferences_list),
    # url(r'^api/reset-password$', views.reset_password)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns = format_suffix_patterns(urlpatterns)